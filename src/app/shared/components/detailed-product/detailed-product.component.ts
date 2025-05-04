import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {FirebaseService} from '../../../core/services/firebase.service';
import {Product} from '../../../core/models/product.model';
import {AuthService} from '../../../core/services/auth.service';
import {BasketItem} from '../../../core/models/basketItem.model';

@Component({
  selector: 'app-detailed-product',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './detailed-product.component.html',
  styleUrl: './detailed-product.component.css'
})
export class DetailedProductComponent implements OnInit, OnDestroy {
  product: Product | undefined;
  productId: string = '';
  counter: number = 1;
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
        console.error(`Product with id ${this.productId} not found.`);
        this.router.navigate(['/']).catch(error => console.error('Navigation error', error));
      }
    });
  }

  addToBasket() {
    if (this.counter <= 0 || !this.product) {
      console.log('Please, select a quantity greater than 0');
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

      if (userDoc.basket && Array.isArray(userDoc.basket)) {
        basket = userDoc.basket;
      } else {
        console.warn('Warning: basket value in database is not an array');
      }

      const existingProductIndex = basket.findIndex(item => item.id === this.productId);

      if (existingProductIndex > -1) {
        basket[existingProductIndex].quantity = this.counter;
      } else {
        basket.push({id: this.productId, quantity: this.counter});
      }

      this.firebaseService.updateUserBasket(user.uid, basket).then(() => {
        console.log(`Added ${this.counter} ${this.product?.name} to Basket`);
        this.router.navigate(['/basket']).catch(error => console.error('Navigation error', error));
        }).catch(error => console.error('Error updating basket', error));
    });
  }

  incrementCounter(){
    this.counter++;
  }

  decrementCounter(){
    if(this.counter > 0){
      this.counter--;
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
