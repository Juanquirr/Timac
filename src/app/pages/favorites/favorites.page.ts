import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonList
} from '@ionic/angular/standalone';
import {FirebaseService} from "../../core/services/firebase.service";
import {BasketItem} from "../../core/model/basketItem.model";
import {Product} from "../../core/model/product.model";
import {FavoriteItemComponent} from '../../components/favorite-item/favorite-item.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonList, FavoriteItemComponent]
})
export class FavoritesPage implements OnInit {
  basketProducts: Map<number, Product> = new Map();
  basketProductsQuantities: Map<number, number> = new Map();
  userProducts: BasketItem[] = [];
  totalItems: number = 0;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.firebaseService.getUserById("uRN3iD898qg7Nj87Jd880isxJ1v2").subscribe(userDoc => {
      if (userDoc.basket) this.userProducts = userDoc.basket;
      this.userProducts.forEach(basketItem => {
        this.firebaseService.getProductByFieldId('products', Number(basketItem.id)).subscribe(products => {
          if (products[0]) {
            this.basketProducts.set(products[0].id, products[0]);
            this.basketProductsQuantities.set(products[0].id, basketItem.quantity);
            this.totalItems = this.basketProducts.size;
          }
        });
      });
    });
  }

  handleRemove(productId: number): void {
    this.basketProducts.delete(productId);
    this.basketProducts = new Map(this.basketProducts);
    this.totalItems = this.basketProducts.size;
  }
}
