import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePaymentMethodComponent } from './update-payment-method.component';

describe('UpdatePaymentMethodComponent', () => {
  let component: UpdatePaymentMethodComponent;
  let fixture: ComponentFixture<UpdatePaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePaymentMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
