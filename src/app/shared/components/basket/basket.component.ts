import { Component, OnInit } from '@angular/core';
import { BasketProductComponent } from '../basket-product/basket-product.component';
import { DecimalPipe, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from '../../../core/services/firebase.service';
import { Product } from '../../../core/models/product.model';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { BasketItem } from '../../../core/models/basketItem.model';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [BasketProductComponent, DecimalPipe, FormsModule, NgForOf],
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {
  basketProducts: Map<number, Product> = new Map();
  basketProductsQuantities: Map<number, number> = new Map();
  userProducts: BasketItem[] = [];
  totalItems: number = 0;
  subtotal: number = 0;
  deliveryFee: number = 0;
  estimatedTotal: number = 0;
  deliveryMethod: string = 'click-collect';
  paymentMethod: string = 'visa';

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBasket();
  }

  loadBasket(): void {
    this.authService.getAuthState().subscribe(user => {
      if (!user) {
        alert('You are not logged in');
        this.router.navigate(['/']);
        return;
      }
      this.firebaseService.getUserById(user.uid).subscribe(userDoc => {
        if (userDoc.basket) this.userProducts = userDoc.basket;
        this.userProducts.forEach(basketItem => {
          this.firebaseService.getProductByFieldId('products', Number(basketItem.id)).subscribe(products => {
            if (products[0]) {
              this.basketProducts.set(products[0].id, products[0]);
              this.basketProductsQuantities.set(products[0].id, basketItem.quantity);
              this.totalItems = this.basketProducts.size;
              this.updateSummary();
            }
          });
        });
        if (this.basketProducts.size === 0) this.updateSummary();
      });
    });
  }

  setDeliveryMethod(method: string): void {
    this.deliveryMethod = method;
    this.updateSummary();
  }

  updateBasket(event: { id: number; quantity: number }): void {
    const product = this.basketProducts.get(event.id);
    if (product) {
      if (event.quantity > 0) this.basketProductsQuantities.set(event.id, event.quantity);
      this.totalItems = this.basketProducts.size;
      this.updateSummary();
    }
  }

  removeProduct(id: number): void {
    this.basketProducts.delete(id);
    this.basketProductsQuantities.delete(id);
    let arrayOfBasketItems: BasketItem[] = [];
    this.basketProductsQuantities.forEach((quantity, key) => {
      arrayOfBasketItems.push({ id: key, quantity: quantity });
    });
    this.firebaseService.updateUserBasket(this.authService.getCurrentUser()!.uid, arrayOfBasketItems);
    this.totalItems = this.basketProducts.size;
    this.updateSummary();
  }


  updateProductSelection(event: { id: number; selected: boolean }): void {
    const product = this.basketProducts.get(event.id);
    if (product) {
      product.checkbox = event.selected;
      this.updateSummary();
    }
  }

  updateSummary(): void {
    const productsArray = Array.from(this.basketProducts.values());
    this.subtotal = productsArray.reduce((sum, product) => {
      const isChecked = product.checkbox ?? true;
      return isChecked ? sum + product.price * this.basketProductsQuantities.get(product.id)! : sum;
    }, 0);
    this.deliveryFee = this.deliveryMethod === 'delivery' ? 5 : 0;
    this.estimatedTotal = this.subtotal + this.deliveryFee;
  }

  checkout(): void {
    console.log('Checkout with', this.paymentMethod);
  }

  get basketProductArray(): Product[] {
    return Array.from(this.basketProducts.values());
  }
}
