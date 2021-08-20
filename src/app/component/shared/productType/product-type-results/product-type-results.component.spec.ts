import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypeResultsComponent } from './product-type-results.component';

describe('ProductTypeResultsComponent', () => {
  let component: ProductTypeResultsComponent;
  let fixture: ComponentFixture<ProductTypeResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTypeResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypeResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
