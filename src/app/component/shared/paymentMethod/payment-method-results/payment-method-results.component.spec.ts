import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodResultsComponent } from './payment-method-results.component';

describe('PaymentMethodResultsComponent', () => {
  let component: PaymentMethodResultsComponent;
  let fixture: ComponentFixture<PaymentMethodResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentMethodResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentMethodResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
