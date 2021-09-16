import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailResultsComponent } from './order-detail-results.component';

describe('OrderDetailResultsComponent', () => {
  let component: OrderDetailResultsComponent;
  let fixture: ComponentFixture<OrderDetailResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
