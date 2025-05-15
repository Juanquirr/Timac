import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {Product} from "../../core/model/product.model";
import {FirebaseService} from "../../core/services/firebase.service";
import {AuthService} from "../../core/services/auth.service";
import {BasketItem} from "../../core/model/basketItem.model";

@Component({
  selector: 'app-detailed-product',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './detailed-product.page.html',
  styleUrl: './detailed-product.page.scss'
})
export class DetailedProductPage implements OnInit, OnDestroy {
  product: Product | undefined;
  productId: string = '';
  subscription: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id')!;

    this.firebaseService.getProductByFieldId('products', Number(this.productId)).subscribe(products => {
      if (products[0]) {
        this.product = products[0];
      } else {
        this.router.navigate(['/']).catch(error => console.error('Navigation error', error));
      }
    });
  }

  addToWishList() {
    if (!this.product) {
      alert('Please, select a quantity greater than 0');
      return;
    }

    const user = this.authService.getCurrentUser();

    if (!user) {
      console.log('User not authenticated');
      alert('User not authenticated, you need to log-in in order to buy or use the basket.');
      return;
    }

    this.subscription = this.firebaseService.getUserById(user.uid).subscribe(userDoc => {
      let basket: BasketItem[] = [];

      if (userDoc.basket && Array.isArray(userDoc.basket)) basket = userDoc.basket;
      else console.warn('Warning: basket value in database is not an array');

      const existingProductIndex = basket.findIndex(item => item.id === Number(this.productId));

      if (existingProductIndex > -1) basket[existingProductIndex].quantity = 1;
      else basket.push({id: Number(this.productId), quantity: 1});

      this.firebaseService.updateUserBasket(user.uid, basket).then(() => {
        this.router.navigate(['/favorites']).catch(error => console.error('Navigation error', error));
      }).catch(error => console.error('Error updating favorites', error));
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
