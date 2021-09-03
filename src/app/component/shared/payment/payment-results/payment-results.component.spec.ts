import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentResultsComponent } from './payment-results.component';

describe('PaymentResultsComponent', () => {
  let component: PaymentResultsComponent;
  let fixture: ComponentFixture<PaymentResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
