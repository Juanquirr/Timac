import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailedProductPage } from './detailed-product.page';

describe('DetailedProductPage', () => {
  let component: DetailedProductPage;
  let fixture: ComponentFixture<DetailedProductPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
