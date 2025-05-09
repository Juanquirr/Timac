import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Product} from '../../../core/models/product.model';
import {FirebaseService} from '../../../core/services/firebase.service';

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

    constructor(private firebaseService: FirebaseService) {}

    ngOnInit() {
      this.firebaseService.getDataObservable('products').subscribe(products => {
        this.offers = products.filter((p: Product) => p.offer);
        this.newProducts = products.filter((p: Product) => p.new);
        this.trendingProducts = products.filter((p: Product) => p.trending);
      });
    }
}
