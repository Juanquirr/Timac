import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Product {
  id: string;
  name: string;
  price: string;
  quantity: number;
  checkbox: boolean;
}

@Component({
  selector: 'app-basket-product',
  templateUrl: './basket-product.component.html',
  imports: [FormsModule],
  styleUrls: ['./basket-product.component.css'],
  standalone: true
})
export class BasketProductComponent {
  @Input() product!: Product;
  @Output() productSelected = new EventEmitter<{ id: string, selected: boolean }>();
  @Output() quantityChange = new EventEmitter<{ id: string, quantity: number }>();
  @Output() removeProduct = new EventEmitter<string>();

  onCheckboxChange(): void {
    this.productSelected.emit({ id: this.product.id, selected: this.product.checkbox });
  }

  decreaseQuantity(): void {
    if (this.product.quantity > 1) {
      this.product.quantity--;
      this.quantityChange.emit({ id: this.product.id, quantity: this.product.quantity });
    }
  }

  increaseQuantity(): void {
    this.product.quantity++;
    this.quantityChange.emit({ id: this.product.id, quantity: this.product.quantity });
  }

  remove(): void {
    this.removeProduct.emit(this.product.id);
  }
}
