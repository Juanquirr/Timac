import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryResultsComponent } from './subcategory-results.component';

describe('SubcategoryResultsComponent', () => {
  let component: SubcategoryResultsComponent;
  let fixture: ComponentFixture<SubcategoryResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoryResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoryResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
