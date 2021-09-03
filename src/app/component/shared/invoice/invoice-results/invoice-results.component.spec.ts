import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceResultsComponent } from './invoice-results.component';

describe('InvoiceResultsComponent', () => {
  let component: InvoiceResultsComponent;
  let fixture: ComponentFixture<InvoiceResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
