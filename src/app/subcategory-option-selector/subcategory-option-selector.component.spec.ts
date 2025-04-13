import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryOptionSelectorComponent } from './subcategory-option-selector.component';

describe('SubcategoryOptionSelectorComponent', () => {
  let component: SubcategoryOptionSelectorComponent;
  let fixture: ComponentFixture<SubcategoryOptionSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoryOptionSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoryOptionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
