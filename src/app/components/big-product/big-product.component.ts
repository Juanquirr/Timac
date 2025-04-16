import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';

export interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  category: string;
  subcategory: string;
  brand: string;
  new: boolean;
  on_sale: boolean;
  trending: boolean;
  available_in_store: boolean;
  available_to_deliver: boolean;
}

@Component({
  selector: 'app-big-product',
  imports: [
    RouterLink
  ],
  standalone: true,
  templateUrl: './big-product.component.html',
  styleUrl: './big-product.component.css'
})
export class BigProductComponent {
    @Input() product!: Product;
}
