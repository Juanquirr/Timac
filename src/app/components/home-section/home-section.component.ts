import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Product} from '../../models/product.model';
import {FirebaseService} from '../../services/firebase.service';

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

    constructor(private http: HttpClient, private firebaseService: FirebaseService) {}

    ngOnInit() {
      this.firebaseService.getData('products').then(products => {
        this.offers = products.filter((p: Product) => p.on_sale);
        this.newProducts = products.filter((p: Product) => p.new);
        this.trendingProducts = products.filter((p: Product) => p.trending);
      });
    }
}
