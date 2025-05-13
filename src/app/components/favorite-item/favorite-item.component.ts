import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.scss'],
})
export class FavoriteItemComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  /*
  private _product!: Product;

  @Output() removeProduct = new EventEmitter<number>();

  remove(): void {
    this.removeProduct.emit(this._product.id);
  }

  get product(): Product {
    return this._product;
  }
  * */

}
