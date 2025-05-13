import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

export interface Product {
  id: number;
  name: string;
  price: number;
  checkbox: boolean;
  currency: string;
  availability: {
    in_store: boolean;
    delivery: boolean;
  };
  brand: string;
  category: string;
  description: string[];
  image: string;
  offer: boolean;
  new: boolean;
  subcategory: string;
  trending: boolean;
  image_alt: string;
}


@Component({
  selector: 'app-big-product',
  imports: [
    RouterLink
  ],
  standalone: true,
  templateUrl: './big-product.component.html',
  styleUrl: './big-product.component.scss'
})
export class BigProductComponent {
  @Input() product!: Product;
}
