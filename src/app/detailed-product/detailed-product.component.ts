import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {NgForOf} from '@angular/common';

interface Product {
  id: string;
  image: string;
  image_alt: string;
  name: string;
  subcategory: string;
  brand: string;
  price: string;
  new: boolean;
  trending: boolean;
  on_sale: boolean;
  availability?: {
    in_store: boolean;
    delivery: boolean;
  };
  description: string[];
}

interface BasketItem {
  id: string;
  quantity: number;
}

@Component({
  selector: 'app-detailed-product',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './detailed-product.component.html',
  styleUrl: './detailed-product.component.css'
})
export class DetailedProductComponent implements OnInit {
  product: Product = {} as Product;
  productId: string = '3';  // ESTO ES TEMPORAL
  counter: number = 1;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) {}
  ngOnInit() {
    // this.productId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.http.get<any>('../assets/products.json').subscribe(data => {
      this.product = data.products.find((p: Product) => p.id == this.productId);
    });
  }

  addToBasket() {
    if (this.counter > 0) {
      let basket: BasketItem[] = JSON.parse(localStorage.getItem('basket') || '[]');
      const existingProductIndex = basket.findIndex(item => item.id == this.productId);

      if (existingProductIndex > -1){
        basket[existingProductIndex].quantity = this.counter;
      } else{
        basket.push({id: this.productId, quantity: this.counter});
      }
      localStorage.setItem('basket', JSON.stringify(basket));
      console.log(`Added ${this.counter} ${this.product.name} to Basket`);
      this.router.navigate(['/basket']);
    } else {
      console.log('Please select a quantity greater than 0');
    }
  }

  incrementCounter(){
    this.counter++;
  }

  decrementCounter(){
    if(this.counter > 0){
      this.counter--;
    }
  }
}
