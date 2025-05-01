import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {FirebaseService} from '../../../core/services/firebase.service';
import {Product} from '../../../core/models/product.model';

interface BasketItem {
  id: string;
  quantity: number;
}

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
export class DetailedProductComponent implements OnInit {
  product: Product | undefined;
  productId: string = '';
  counter = signal(1);

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id')!;

    this.firebaseService.getProductByFieldId('products', Number(this.productId)).subscribe(products => {
      if (products[0]) this.product = products[0]; else this.router.navigate(['/']);
    });
  }

  addToBasket() {
    if (this.counter() > 0 && this.product) {
      let basket: BasketItem[] = JSON.parse(localStorage.getItem('basket') || '[]');
      const existingProductIndex = basket.findIndex(item => item.id == this.productId);

      if (existingProductIndex > -1) basket[existingProductIndex].quantity = this.counter();
      else basket.push({
        id: this.productId,
        quantity: this.counter()
      });

      localStorage.setItem('basket', JSON.stringify(basket));
      this.router.navigate(['/basket']);
    }
  }

  incrementCounter(){
    this.counter.update(value => value + 1);
  }

  decrementCounter(){
    if(this.counter() > 0) this.counter.update(value => value - 1);
  }
}
