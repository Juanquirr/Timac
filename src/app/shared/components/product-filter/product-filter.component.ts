import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass, NgForOf } from '@angular/common';

@Component({
  selector: 'app-product-filter',
  imports: [
    FormsModule,
    NgClass,
    NgForOf,
  ],
  standalone: true,
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css'
})
export class ProductFilterComponent implements AfterViewInit, OnChanges {
  @Output() filterChange = new EventEmitter<{ priceRange: { min: number, max: number }, brands: string[] }>();

  @ViewChild('minInput') minInput!: ElementRef<HTMLInputElement>;
  @ViewChild('maxInput') maxInput!: ElementRef<HTMLInputElement>;

  @Input() minPriceLimit: number = 1;
  @Input() maxPriceLimit: number = 10000;
  @Input() brands: string[] = [];

  minPrice: number = 1;
  maxPrice: number = 10000;
  minPercent: number = 0;
  maxPercent: number = 100;
  editingMin: boolean = false;
  editingMax: boolean = false;
  minPriceInput: string = '';
  maxPriceInput: string = '';
  selectedBrands: { [key: string]: boolean } = {};
  isPriceBarVisible: boolean = false;
  isBrandBarVisible: boolean = false;
  isPriceLabelVisible: boolean = false;
  isBarSliderVisible: boolean = false;
  arrowStates: { [key: string]: boolean } = {
    'filter-bar-arrow-first': false,
    'filter-bar-arrow-second': false
  };
  rangeValuesJustify: string = 'space-between';
  constructor(private cdr: ChangeDetectorRef) {}


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['minPriceLimit'] || changes['maxPriceLimit']) {

      this.minPrice = this.minPriceLimit;
      this.maxPrice = this.maxPriceLimit;

      this.minPrice = Math.max(this.minPriceLimit, Math.min(this.maxPriceLimit, this.minPrice));
      this.maxPrice = Math.max(this.minPriceLimit, Math.min(this.maxPriceLimit, this.maxPrice));
      if (this.maxPrice < this.minPrice) {
        this.maxPrice = this.minPrice;
      }
      this.minPriceInput = `${this.minPrice}€`;
      this.maxPriceInput = `${this.maxPrice}€`;
      this.updateRange();
    }
    if (changes['brands']) {
      this.selectedBrands = {};
      this.brands.forEach(brand => this.selectedBrands[brand] = false);
    }
  }

  ngAfterViewInit() {

    let supportsThumb: boolean = true;
    if (this.minInput) {
      const inputElement = this.minInput.nativeElement;
      const webkitThumbAppearance = window.getComputedStyle(inputElement, '::-webkit-slider-thumb').getPropertyValue('appearance');
      const mozThumbAppearance = window.getComputedStyle(inputElement, '::-moz-range-thumb').getPropertyValue('appearance');
      supportsThumb = !!webkitThumbAppearance || !!mozThumbAppearance;
    }

    this.isPriceLabelVisible = !supportsThumb;
    this.isBarSliderVisible = supportsThumb;
    this.rangeValuesJustify = supportsThumb ? 'space-between' : 'space-evenly';
    this.cdr.detectChanges();
  }

  updateRange(source: string = '') {
    let min = this.minPrice;
    let max = this.maxPrice;

    if (min > max) {
      if (source === 'minPrice') {
        this.maxPrice = min;
        max = min;
      } else if (source === 'maxPrice') {
        this.minPrice = max;
        min = max;
      }
    }

    this.minPercent = ((min - this.minPriceLimit) / (this.maxPriceLimit - this.minPriceLimit)) * 100;
    this.maxPercent = ((max - this.minPriceLimit) / (this.maxPriceLimit - this.minPriceLimit)) * 100;

    this.minPriceInput = `${this.minPrice}€`;
    this.maxPriceInput = `${this.maxPrice}€`;

    this.emitFilters();
  }

  enableEditing(field: string) {
    if (field === 'minValue') {
      this.editingMin = true;
      this.minPriceInput = this.minPrice.toString();
      if (this.minInput) {
        this.minInput.nativeElement.focus();
        this.minInput.nativeElement.select();
      }
    } else if (field === 'maxValue') {
      this.editingMax = true;
      this.maxPriceInput = this.maxPrice.toString();
      if (this.maxInput) {
        this.maxInput.nativeElement.focus();
        this.maxInput.nativeElement.select();
      }
    }
  }

  disableEditing(field: string) {
    if (field === 'minValue') {
      let value = parseInt(this.minPriceInput);
      if (isNaN(value)) value = this.minPriceLimit;
      value = Math.max(this.minPriceLimit, Math.min(this.maxPriceLimit, value));
      this.minPrice = value;
      this.minPriceInput = `${this.minPrice}€`;
      this.editingMin = false;

      if (this.maxPrice < this.minPrice) {
        this.maxPrice = this.minPrice;
        this.maxPriceInput = `${this.maxPrice}€`;
      }

      this.updateRange('minValue');
    } else if (field === 'maxValue') {
      let value = parseInt(this.maxPriceInput);
      if (isNaN(value)) value = this.maxPriceLimit;
      value = Math.max(this.minPriceLimit, Math.min(this.maxPriceLimit, value));
      this.maxPrice = value;
      this.maxPriceInput = `${this.maxPrice}€`;
      this.editingMax = false;

      if (this.maxPrice < this.minPrice) {
        this.minPrice = this.maxPrice;
        this.minPriceInput = `${this.minPrice}€`;
      }

      this.updateRange('maxValue');
    }
  }

  onKeyPress(event: KeyboardEvent, field: string) {
    if (event.key === 'Enter') this.disableEditing(field);
  }

  restrictToNumbers(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^0-9]/g, '');
  }


  barToggle(barClass: string, arrowId: string) {
    if (barClass === 'price-bar') {
      this.isPriceBarVisible = !this.isPriceBarVisible;
    } else if (barClass === 'filter-bar-option-brand') {
      this.isBrandBarVisible = !this.isBrandBarVisible;
    }
    const arrow = document.getElementById(arrowId) as HTMLImageElement;
    arrow.classList.toggle('rotated');
  }

  emitFilters() {
    const selectedBrandList = Object.keys(this.selectedBrands).filter(brand => this.selectedBrands[brand]);
    this.filterChange.emit({
      priceRange: { min: this.minPrice, max: this.maxPrice },
      brands: selectedBrandList
    });
  }
}
