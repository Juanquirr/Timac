import { Component } from '@angular/core';
import {ProductFilterComponent} from '../product-filter/product-filter.component';
import {ProductDisplayComponent} from '../product-display/product-display.component';

@Component({
  selector: 'app-subcategory-results',
  imports: [
    ProductFilterComponent,
    ProductDisplayComponent,
  ],
  standalone: true,
  templateUrl: './subcategory-results.component.html',
  styleUrl: './subcategory-results.component.css'
})
export class SubcategoryResultsComponent {
  minPriceLimit: number = -1;
  maxPriceLimit: number = -1;
  brands: string[] = [];

  newMinPrice: number | null = null;
  newMaxPrice: number | null = null;
  newBrands: string[] = [];

  onInitialFiltersReady(data: { minPriceLimit: number, maxPriceLimit: number, brands: string[] }) {
    this.minPriceLimit = data.minPriceLimit;
    this.maxPriceLimit = data.maxPriceLimit;
    this.brands = data.brands;

    this.newMinPrice = data.minPriceLimit;
    this.newMaxPrice = data.maxPriceLimit;
    this.newBrands = data.brands;
  }

  onFilterChange(filters: { priceRange: { min: number; max: number }; brands: string[] }) {
    this.newMinPrice = filters.priceRange.min;
    this.newMaxPrice = filters.priceRange.max;
    this.newBrands = filters.brands;
  }
}
