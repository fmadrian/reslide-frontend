import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderResultsComponent } from './order-results.component';

describe('OrderResultsComponent', () => {
  let component: OrderResultsComponent;
  let fixture: ComponentFixture<OrderResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
