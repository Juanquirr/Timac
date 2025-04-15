import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigProductComponent } from './big-product.component';

describe('BigProductComponent', () => {
  let component: BigProductComponent;
  let fixture: ComponentFixture<BigProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
