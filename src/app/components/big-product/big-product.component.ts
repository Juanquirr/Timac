import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Product} from '../../models/product.model';


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
