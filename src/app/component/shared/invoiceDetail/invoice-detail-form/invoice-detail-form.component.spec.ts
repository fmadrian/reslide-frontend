import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailFormComponent } from './invoice-detail-form.component';

describe('InvoiceDetailFormComponent', () => {
  let component: InvoiceDetailFormComponent;
  let fixture: ComponentFixture<InvoiceDetailFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceDetailFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
