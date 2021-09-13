import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceTotalComponent } from './invoice-total.component';

describe('InvoiceTotalComponent', () => {
  let component: InvoiceTotalComponent;
  let fixture: ComponentFixture<InvoiceTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceTotalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
