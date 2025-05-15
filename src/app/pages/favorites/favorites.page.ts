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
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonList, FavoriteItemComponent]
})
export class FavoritesPage implements OnInit {
  favoriteProducts: Map<number, Product> = new Map();
  favoriteIdOfUser: Map<number, number> = new Map();
  userProducts: BasketItem[] = [];
  totalItems: number = 0;

  constructor(private firebaseService: FirebaseService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    let userUid = this.authService.getCurrentUser()?.uid;

    if (!userUid) {
      alert('You are not logged in');
      this.router.navigate(['/']);
      return;
    }

    this.firebaseService.getUserById(userUid).subscribe(userDoc => {
      if (userDoc.basket) this.userProducts = userDoc.basket;
      this.userProducts.forEach(basketItem => {
        this.firebaseService.getProductByFieldId('products', Number(basketItem.id)).subscribe(products => {
          if (products[0]) {
            this.favoriteProducts.set(products[0].id, products[0]);
            this.favoriteIdOfUser.set(products[0].id, 1);
            this.totalItems = this.favoriteProducts.size;
          }
        });
      });
    });
  }

  handleRemove(productId: number): void {
    this.favoriteProducts.delete(productId);
    this.favoriteProducts = new Map(this.favoriteProducts);
    this.favoriteIdOfUser.delete(productId);
    let favoriteArrayOfUser: BasketItem[] = [];
    this.favoriteIdOfUser.forEach((quantity, key) => {
      favoriteArrayOfUser.push({ id: key, quantity: quantity });
    });
    this.firebaseService.updateUserBasket(this.authService.getCurrentUser()!.uid, favoriteArrayOfUser);
    this.totalItems = this.favoriteProducts.size;
  }
}
