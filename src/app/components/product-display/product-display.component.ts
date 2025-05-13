import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { BigProductComponent } from '../big-product/big-product.component';
import {FirebaseService} from "../../core/services/firebase.service";
import {Observable} from "rxjs";
import {Product} from "../../core/model/product.model";


@Component({
  selector: 'app-product-display',
  standalone: true,
  imports: [IonicModule, CommonModule, NgIf, NgForOf, BigProductComponent],
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.scss']
})
export class ProductDisplayComponent implements OnInit {
  products: Product[] = [];

  constructor(private firebaseService: FirebaseService) {}


  ngOnInit(): void {
    this.loadProductsFromFirebase();
  }


  loadProductsFromFirebase(): void {
    const productObservable: Observable<Product[]> = this.firebaseService.getDataObservable('products');
    productObservable.subscribe(data => {
      this.products = data;
      console.log(data);
    });
  }

}
