import { Component, OnInit } from '@angular/core';
import { BasketProductComponent } from '../basket-product/basket-product.component';
import { DecimalPipe, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Product } from '../../models/product.model';

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

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.loadBasket();
  }

  loadBasket(): void {
    this.firebaseService.getData('products').then(products => {
      if (products.length === 0) this.updateSummary();

      const convertedProducts: Product[] = products.map((p: any) => ({
        ...p,
        id: Number(p.id)
      }));

      const selectedProduct = convertedProducts.find((p) => p.id === 3);


      if (selectedProduct) this.basketProducts = [
          { ...selectedProduct, quantity: 3, checkbox: true }
        ];

      this.totalItems = this.basketProducts.length;
      this.updateSummary();
    }).catch(error => {
      console.error('Error loading products from Firestore:', error);
    });
  }

  setDeliveryMethod(method: string): void {
    this.deliveryMethod = method;
    this.updateSummary();
  }

  updateBasket(event: { id: number, quantity: number }): void {
    const product = this.basketProducts.find(p => p.id === event.id);
    if (product) {
      if (event.quantity > 0) product.quantity = event.quantity;
      else this.removeProduct(event.id);
      this.updateSummary();
    }
  }

  removeProduct(id: number): void {
    this.basketProducts = this.basketProducts.filter(p => p.id !== id);
    this.totalItems = this.basketProducts.length;
    this.updateSummary();
  }

  updateProductSelection(event: { id: number; selected: boolean }): void {
    const product = this.basketProducts.find(p => p.id === event.id);
    if (product) {
      product.checkbox = event.selected;
      this.updateSummary();
    }
  }

  updateSummary(): void {
    this.subtotal = this.basketProducts.reduce((sum, product) => {
      const isChecked = product.checkbox ?? true;
      return isChecked ? sum + product.price * product.quantity : sum;
    }, 0);
    this.deliveryFee = this.deliveryMethod === 'delivery' ? 5 : 0;
    this.estimatedTotal = this.subtotal + this.deliveryFee;
  }

  checkout(): void {
    console.log('Checkout with', this.paymentMethod);
  }
}
