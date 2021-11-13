import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProductBrandComponent } from './update-product-brand.component';

describe('UpdateProductBrandComponent', () => {
  let component: UpdateProductBrandComponent;
  let fixture: ComponentFixture<UpdateProductBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProductBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProductBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
