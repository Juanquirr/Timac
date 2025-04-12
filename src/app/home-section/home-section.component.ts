import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';

interface Product {
  id: string;
  image: string;
  image_alt: string;
  name: string;
  price: string;
  new: boolean;
  trending: boolean;
  on_sale: boolean;
}

@Component({
  selector: 'app-home-section',
  standalone: true,
  templateUrl: './home-section.component.html',
  imports: [
    RouterLink,
    NgForOf
  ],
  styleUrl: './home-section.component.css'
})
export class HomeSectionComponent implements OnInit {
    offers: Product[] = [];
    newProducts: Product[] = [];
    trendingProducts: Product[] = [];

    constructor(private http: HttpClient) {}

    ngOnInit() {
      this.http.get<any>('../assets/products.json').subscribe(data => {
        const products: Product[] = data.products;
        this.offers = products.filter(p => p.on_sale);
        this.newProducts = products.filter(p => p.new);
        this.trendingProducts = products.filter(p => p.trending);
        });
    }
}
