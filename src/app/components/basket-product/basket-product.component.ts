import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../models/product.model';



@Component({
  selector: 'app-basket-product',
  templateUrl: './basket-product.component.html',
  imports: [FormsModule],
  styleUrls: ['./basket-product.component.css'],
  standalone: true
})
export class BasketProductComponent {
  @Input() product!: Product;
  @Output() productSelected = new EventEmitter<{ id: number, selected: boolean }>();
  @Output() quantityChange = new EventEmitter<{ id: number, quantity: number }>();
  @Output() removeProduct = new EventEmitter<number>();

  onCheckboxChange(): void {
    const isSelected = this.product.checkbox ?? false;
    this.productSelected.emit({ id: this.product.id, selected: isSelected });
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
