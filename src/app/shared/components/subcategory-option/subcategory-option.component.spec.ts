import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubcategoryOptionComponent } from './subcategory-option.component';

describe('SubcategoryOptionComponent', () => {
  let component: SubcategoryOptionComponent;
  let fixture: ComponentFixture<SubcategoryOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubcategoryOptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoryOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
