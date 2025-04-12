import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForOf } from '@angular/common';
import { SubcategoryOptionComponent } from '../subcategory-option/subcategory-option.component';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

interface Subcategory {
  image: string;
  name: string;
  alt: string;
  link: string;
}

interface CategoryData {
  [key: string]: Subcategory[];
}

@Component({
  selector: 'app-subcategory-option-selector',
  templateUrl: './subcategory-option-selector.component.html',
  imports: [NgForOf, SubcategoryOptionComponent],
  styleUrls: ['./subcategory-option-selector.component.css'],
})
export class SubcategoryOptionSelectorComponent implements OnInit, OnDestroy {
  subcategories: Subcategory[] = [];
  category: string = '';
  private httpSubscription?: Subscription;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    const urlSegments = this.route.snapshot.url;

    if (urlSegments.length > 0) {
      this.category = urlSegments[urlSegments.length - 1].path;
    } else {
      this.category = '';
    }

    if (this.category) {
      this.category = this.category.charAt(0).toUpperCase() + this.category.slice(1);
    }

    this.loadSubcategories();
  }

  loadSubcategories() {
    this.httpSubscription = this.http
      .get<CategoryData>('assets/subcategory-option-selector.json')
      .subscribe({
        next: (data) => {
          if (this.category && data[this.category]) {
            this.subcategories = data[this.category];
          } else {
            this.subcategories = Object.values(data).flat();
          }
        },
        error: (error) => {
          console.error('Error loading JSON', error);
          this.subcategories = [];
        },
      });
  }

  ngOnDestroy() {
    this.httpSubscription?.unsubscribe();
  }
}
