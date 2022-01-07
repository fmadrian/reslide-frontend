import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductResultsQuantityComponent } from './product-results-quantity.component';

describe('ProductResultsQuantityComponent', () => {
  let component: ProductResultsQuantityComponent;
  let fixture: ComponentFixture<ProductResultsQuantityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductResultsQuantityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductResultsQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
