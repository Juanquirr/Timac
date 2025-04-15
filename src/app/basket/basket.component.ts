import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BasketProductComponent } from '../basket-product/basket-product.component';
import {DecimalPipe, NgForOf} from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Product {
  id: string;
  name: string;
  price: string;
  quantity: number;
  checkbox: boolean;
}

@Component({
  selector: 'app-basket',
  imports: [BasketProductComponent, DecimalPipe, FormsModule, NgForOf],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basketProducts: Product[] = [];
  totalItems: number = 0;
  subtotal: number = 0;
  deliveryFee: number = 0;
  estimatedTotal: number = 0;
  deliveryMethod: string = 'click-collect';
  paymentMethod: string = 'visa';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadBasket();
  }

  loadBasket(): void {
    this.http.get<any>('/assets/products.json').subscribe(
      (data) => {
        const allProducts: Product[] = data.products;
        this.basketProducts = [
          { ...allProducts[0], quantity: 2, checkbox: true },
          { ...allProducts[1], quantity: 1, checkbox: true }
        ].filter(Boolean);
        this.totalItems = this.basketProducts.length;
        this.updateSummary();
      },
      (error) => console.error('Error loading products:', error)
    );
  }

  setDeliveryMethod(method: string): void {
    this.deliveryMethod = method;
    this.updateSummary();
  }

  updateBasket(event: { id: string, quantity: number }): void {
    const product: Product = <Product>this.basketProducts.find(p => p.id === event.id);
    if (product) {
      if (event.quantity > 0) product.quantity = event.quantity;
      else
        this.removeProduct(event.id);
      this.updateSummary();
    }
  }

  removeProduct(id: string): void {
    this.basketProducts = this.basketProducts.filter(p => p.id !== id);
    this.totalItems = this.basketProducts.length;
    this.updateSummary();
  }

  updateProductSelection(event: { id: string, selected: boolean }): void {
    const product = this.basketProducts.find(p => p.id === event.id);
    if (product) {
      product.checkbox = event.selected;
      this.updateSummary();
    }
  }

  updateSummary(): void {
    this.subtotal = this.basketProducts.reduce((sum, product) => {
      const price = parseFloat(product.price.replace('€', ''));
      return product.checkbox ? sum + price * product.quantity : sum;
    }, 0);
    this.deliveryFee = this.deliveryMethod === 'delivery' ? 5 : 0;
    this.estimatedTotal = this.subtotal + this.deliveryFee;
  }

  checkout(): void {
    console.log('Checkout with', this.paymentMethod);
  }
}
