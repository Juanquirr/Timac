import {Component, OnDestroy, OnInit} from '@angular/core';
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
import {RouterLink} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonList, FavoriteItemComponent, RouterLink]
})
export class FavoritesPage implements OnInit, OnDestroy {
  favoriteProducts: Map<number, Product> = new Map();
  favoriteIdOfUser: Map<number, number> = new Map();
  userProducts: BasketItem[] = [];
  totalItems: number = 0;
  userUid: any = null;
  userSubscription!: Subscription;

  constructor(private firebaseService: FirebaseService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userSubscription = this.authService.getAuthState().subscribe(user => {
      if (user){
        this.userUid = user.uid
        this.loadFavorites();
      } else {
        this.userUid = null;
      }
    });
  }

  loadFavorites(): void {
    if(!this.userUid) {
      console.log('You are not logged in');
      return;
    }

    this.firebaseService.getUserById(this.userUid).subscribe(userDoc => {
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

  ngOnDestroy() {
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }
  }
}
