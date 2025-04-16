import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import {BigProductComponent, Product} from '../big-product/big-product.component';
import {NgForOf, NgIf} from '@angular/common';


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

  ngOnInit(): void {
    this.loadProducts();
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
      const priceA = parseFloat(a.price.replace(/[^\d.-]/g, ''));
      const priceB = parseFloat(b.price.replace(/[^\d.-]/g, ''));

      return this.sortAscending ? priceA - priceB : priceB - priceA;
    });
  }



  loadProducts(): void {
    this.searchQuery = new URLSearchParams(window.location.search).get("query") || "";


    fetch('assets/products.json')
      .then(response => response.json())
      .then(data => {
        this.allProducts = data.products;
        this.products = this.filterProducts(this.allProducts, this.searchQuery);


        if (!this.filtersSent && this.allProducts.length > 0) {
          const prices = this.allProducts.map(p => parseFloat(p.price.replace(/[^\d.-]/g, '')));
          const uniqueBrands = [...new Set(this.allProducts.map(p => p.brand))];

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
      .catch(error => console.error('Error loading products:', error));
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
      const price = parseFloat(product.price.replace(/[^\d.-]/g, ''));
      return price >= this.minPrice! && price <= this.maxPrice!;
    });
  }

  filterProducts(products: Product[], searchQuery: string): Product[] {
    if (searchQuery === "new") return products.filter(p => p.new);
    if (searchQuery === "offers") return products.filter(p => p.on_sale);
    if (searchQuery === "trending") return products.filter(p => p.trending);

    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
}
