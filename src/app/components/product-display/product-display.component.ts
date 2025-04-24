import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {BigProductComponent} from '../big-product/big-product.component';
import {NgForOf, NgIf} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import {Product} from '../../models/product.model';


@Component({
  selector: 'app-product-display',
  imports: [BigProductComponent, NgIf, NgForOf],
  standalone: true,
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})
export class ProductDisplayComponent implements OnInit, OnChanges {
  @Input() minPrice: number | null = null;
  @Input() maxPrice: number | null = null;
  @Input() brands: string[] = [];

  @Output() initialFiltersReady = new EventEmitter<{ minPriceLimit: number, maxPriceLimit: number, brands: string[] }>();

  products: Product[] = [];
  allProducts: Product[] = [];
  filtersSent:boolean = false;
  searchQuery:string = "";
  sortAscending:boolean = true;
  sortButtonLabel:string = 'Price (Low to High)';

  constructor(private route: ActivatedRoute, private firebaseService: FirebaseService) {}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['query'] || '';
      this.loadProductsFromFirebase();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['minPrice'] || changes['maxPrice'] || changes['brands']) {
      this.applyFilters();
    }
  }

  toggleSortOrder(): void {
    this.sortAscending = !this.sortAscending;
    this.sortButtonLabel = this.sortAscending ? 'Price (Low to High)' : 'Price (High to Low)';
    this.sortProducts();
  }

  sortProducts(): void {
    this.products.sort((a, b) => {
      return this.sortAscending ? a.price - b.price : b.price - a.price;
    });
  }

  loadProductsFromFirebase(): void {
    const filterMap = new Map([
      ['new', 'new'],
      ['offers', 'offer'],
      ['trending', 'trending']
    ]);

    const filterKey = this.searchQuery.toLowerCase();
    let fetchPromise: Promise<any[]>;
    const isSpecialFilter = filterMap.has(filterKey);
    if (isSpecialFilter) {
      fetchPromise = this.firebaseService.getFilteredData('products', filterMap.get(filterKey)!, true);
    } else {
      fetchPromise = this.firebaseService.getData('products');
    }

    fetchPromise
      .then(data => {
        this.allProducts = data;
        this.products = isSpecialFilter
          ? data
          : this.filterProducts(data, this.searchQuery);

        if (!this.filtersSent && this.products.length > 0) {
          const prices = this.products.map(p => Number(p.price)).filter(price => !isNaN(price));
          const uniqueBrands = [...new Set(this.products.map(p => p.brand).filter(Boolean))];

          this.initialFiltersReady.emit({
            minPriceLimit: Math.floor(Math.min(...prices)),
            maxPriceLimit: Math.ceil(Math.max(...prices)),
            brands: uniqueBrands
          });

          this.filtersSent = true;
        }

        if (this.minPrice !== null && this.maxPrice !== null) {
          this.applyFilters();
        }
      })
      .catch(error => console.error('Error loading products from Firebase:', error));
  }



  applyFilters(): void {
    let filteredProducts = [...this.allProducts];

    filteredProducts = this.filterProducts(filteredProducts, this.searchQuery);

    if (this.minPrice !== null && this.maxPrice !== null) {
      filteredProducts = this.filterByPrice(filteredProducts);
    }

    if (this.brands.length > 0) {
      filteredProducts = filteredProducts.filter(product => this.brands.includes(product.brand));
    }
    this.products = filteredProducts;
    this.sortProducts();
  }

  filterByPrice(products: Product[]): Product[] {
    if (this.minPrice === -1 || this.maxPrice === -1) return products;
    return products.filter(product => {
      const price = product.price;
      return price >= this.minPrice! && price <= this.maxPrice!;
    });
  }

  filterProducts(products: Product[], searchQuery: string): Product[] {
    if (searchQuery === "new") return products.filter(p => p.new);
    if (searchQuery === "offers") return products.filter(p => p.offer);
    if (searchQuery === "trending") return products.filter(p => p.trending);

    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
}
