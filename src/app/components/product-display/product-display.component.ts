import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BigProductComponent } from '../big-product/big-product.component';


export interface Product {
  id: number;
  name: string;
  price: number;
  checkbox: boolean;
  currency: string;
  availability: {
    in_store: boolean;
    delivery: boolean;
  };
  brand: string;
  category: string;
  description: string[];
  image: string;
  offer: boolean;
  new: boolean;
  subcategory: string;
  trending: boolean;
  image_alt: string;
}

@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [IonicModule, CommonModule, NgIf, NgForOf, BigProductComponent],
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss']
})
export class ProductDisplayComponent implements OnInit {
  products: Product[] = [];


  private testProducts: Product[] = [
    {
      id: 1,
      name: 'Cordless Drill Pro',
      price: 59.99,
      checkbox: false,
      currency: 'EUR',
      availability: { in_store: true, delivery: true },
      brand: 'Bosch',
      category: 'Tools',
      description: ['High torque', 'Lightweight design', 'Lithium battery'],
      image: 'assets/adapter.png',
      offer: true,
      new: false,
      subcategory: 'Drills',
      trending: true,
      image_alt: 'Bosch cordless drill'
    },
    {
      id: 2,
      name: 'Multi-Purpose Ladder',
      price: 129.99,
      checkbox: false,
      currency: 'EUR',
      availability: { in_store: false, delivery: true },
      brand: 'Werner',
      category: 'Construction',
      description: ['Aluminum', 'Foldable', '3.5 meters height'],
      image: 'assets/adapter.png',
      offer: false,
      new: true,
      subcategory: 'Ladders',
      trending: false,
      image_alt: 'Werner aluminum ladder'
    },
    {
      id: 3,
      name: 'Professional Angle Grinder',
      price: 89.99,
      checkbox: false,
      currency: 'EUR',
      availability: { in_store: true, delivery: true },
      brand: 'Makita',
      category: 'Tools',
      description: ['850W motor', 'Safety guard', 'Ergonomic grip'],
      image: 'assets/adapter.png',
      offer: false,
      new: false,
      subcategory: 'Grinders',
      trending: true,
      image_alt: 'Makita angle grinder'
    },
    {
      id: 4,
      name: 'Laser Distance Measurer',
      price: 79.99,
      checkbox: false,
      currency: 'EUR',
      availability: { in_store: true, delivery: false },
      brand: 'DeWalt',
      category: 'Measuring Tools',
      description: ['Range up to 50m', 'Backlit display', 'Accurate and fast'],
      image: 'assets/adapter.png',
      offer: true,
      new: true,
      subcategory: 'Distance Meters',
      trending: false,
      image_alt: 'DeWalt laser measurer'
    },
    {
      id: 5,
      name: 'Cordless Circular Saw',
      price: 179.99,
      checkbox: false,
      currency: 'EUR',
      availability: { in_store: false, delivery: true },
      brand: 'Black+Decker',
      category: 'Tools',
      description: ['Precision cutting', 'Adjustable depth', 'Compact design'],
      image: 'assets/adapter.png',
      offer: false,
      new: false,
      subcategory: 'Saws',
      trending: true,
      image_alt: 'Black+Decker circular saw'
    },
    {
      id: 6,
      name: 'Toolbox with Compartments',
      price: 39.99,
      checkbox: false,
      currency: 'EUR',
      availability: { in_store: true, delivery: true },
      brand: 'Stanley',
      category: 'Storage',
      description: ['Multiple compartments', 'Heavy-duty plastic', 'Portable handle'],
      image: 'assets/adapter.png',
      offer: true,
      new: false,
      subcategory: 'Tool Storage',
      trending: false,
      image_alt: 'Stanley toolbox'
    },
    {
      id: 7,
      name: 'Digital Caliper',
      price: 29.99,
      checkbox: false,
      currency: 'EUR',
      availability: { in_store: true, delivery: true },
      brand: 'Mitutoyo',
      category: 'Measuring Tools',
      description: ['Precision to 0.01mm', 'Stainless steel', 'LCD display'],
      image: 'assets/adapter.png',
      offer: false,
      new: true,
      subcategory: 'Calipers',
      trending: false,
      image_alt: 'Mitutoyo digital caliper'
    },
    {
      id: 8,
      name: 'Heavy Duty Workbench',
      price: 249.99,
      checkbox: false,
      currency: 'EUR',
      availability: { in_store: true, delivery: false },
      brand: 'Keter',
      category: 'Workshop',
      description: ['Steel frame', 'Built-in storage', '120cm width'],
      image: 'assets/adapter.png',
      offer: false,
      new: false,
      subcategory: 'Workbenches',
      trending: true,
      image_alt: 'Keter workbench'
    },
    {
      id: 9,
      name: 'Electric Pressure Washer',
      price: 149.99,
      checkbox: false,
      currency: 'EUR',
      availability: { in_store: false, delivery: true },
      brand: 'Kärcher',
      category: 'Cleaning',
      description: ['1400 PSI', 'Includes accessories', 'Compact design'],
      image: 'assets/adapter.png',
      offer: true,
      new: false,
      subcategory: 'Pressure Washers',
      trending: false,
      image_alt: 'Kärcher pressure washer'
    },
    {
      id: 10,
      name: 'Welding Helmet Auto-Darkening',
      price: 69.99,
      checkbox: false,
      currency: 'EUR',
      availability: { in_store: true, delivery: true },
      brand: 'Lincoln Electric',
      category: 'Safety',
      description: ['Auto-darkening filter', 'UV/IR protection', 'Comfort fit'],
      image: 'assets/adapter.png',
      offer: false,
      new: true,
      subcategory: 'Welding Safety',
      trending: false,
      image_alt: 'Lincoln Electric welding helmet'
    }
  ];


  constructor() {}
  /*
  constructor(private firebaseService: FirebaseService) {}
  */

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = this.testProducts;
  }

  /*
  loadProductsFromFirebase(): void {
    const productObservable: Observable<Product[]> = this.firebaseService.getAllData('products');
    productObservable.subscribe(data => {
      this.products = data;
    });
  }
  */
}
