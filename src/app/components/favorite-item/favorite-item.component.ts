import {Component, EventEmitter, Output} from '@angular/core';
import {Product} from "../../core/model/product.model";

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.scss'],
})
export class FavoriteItemComponent {

  constructor() { }


  private _product!: Product;

  @Output() removeProduct = new EventEmitter<number>();

  remove(): void {
    this.removeProduct.emit(this._product.id);
  }

  get product(): Product {
    return this._product;
  }
}
