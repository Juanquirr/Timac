import { Component, Input, Output, EventEmitter, signal, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../core/models/product.model';

@Component({
  selector: 'app-basket-product',
  templateUrl: './basket-product.component.html',
  imports: [FormsModule],
  styleUrls: ['./basket-product.component.css'],
  standalone: true
})
export class BasketProductComponent {
  private _product!: Product;
  private _productQuantity: number = 1;

  quantity = signal(this._productQuantity);
  checkbox = signal(true);

  @Input() set quantityInput(value: number) {
    this._productQuantity = value;
    this.quantity.set(value);
  }

  @Input() set product(value: Product) {
    this.checkbox.set(value.checkbox ?? true);
    this._product = value;
  }

  @Output() productSelected = new EventEmitter<{ id: number, selected: boolean }>();
  @Output() quantityChange = new EventEmitter<{ id: number, quantity: number }>();
  @Output() removeProduct = new EventEmitter<number>();

  constructor() {
    effect(() => {
      this.quantityChange.emit({ id: this._product?.id, quantity: this.quantity() });
    });

    effect(() => {
      this.productSelected.emit({ id: this._product?.id, selected: this.checkbox() });
    });
  }

  onCheckboxChange(): void {
    this.checkbox.set(!this.checkbox());
  }

  decreaseQuantity(): void {
    if (this.quantity() > 1) this.quantity.set(this.quantity() - 1);
  }

  increaseQuantity(): void {
    this.quantity.set(this.quantity() + 1);
  }

  remove(): void {
    this.removeProduct.emit(this._product.id);
  }

  get product(): Product {
    return this._product;
  }
}
