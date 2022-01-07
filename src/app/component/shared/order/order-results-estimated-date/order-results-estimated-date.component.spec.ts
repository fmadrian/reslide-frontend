import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderResultsEstimatedDateComponent } from './order-results-estimated-date.component';

describe('OrderResultsEstimatedDateComponent', () => {
  let component: OrderResultsEstimatedDateComponent;
  let fixture: ComponentFixture<OrderResultsEstimatedDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderResultsEstimatedDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderResultsEstimatedDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
