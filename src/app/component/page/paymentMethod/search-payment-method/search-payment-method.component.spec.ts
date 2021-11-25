import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPaymentMethodComponent } from './search-payment-method.component';

describe('SearchPaymentMethodComponent', () => {
  let component: SearchPaymentMethodComponent;
  let fixture: ComponentFixture<SearchPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchPaymentMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
