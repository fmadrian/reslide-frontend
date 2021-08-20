import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBrandResultsComponent } from './product-brand-results.component';

describe('ProductBrandResultsComponent', () => {
  let component: ProductBrandResultsComponent;
  let fixture: ComponentFixture<ProductBrandResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBrandResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBrandResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
