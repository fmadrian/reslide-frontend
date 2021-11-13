import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductBrandComponent } from './create-product-brand.component';

describe('CreateProductBrandComponent', () => {
  let component: CreateProductBrandComponent;
  let fixture: ComponentFixture<CreateProductBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProductBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
