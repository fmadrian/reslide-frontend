import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailResultsComponent } from './invoice-detail-results.component';

describe('InvoiceDetailResultsComponent', () => {
  let component: InvoiceDetailResultsComponent;
  let fixture: ComponentFixture<InvoiceDetailResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceDetailResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDetailResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
