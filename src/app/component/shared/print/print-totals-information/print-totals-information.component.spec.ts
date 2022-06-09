import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintTotalsInformationComponent } from './print-totals-information.component';

describe('PrintTotalsInformationComponent', () => {
  let component: PrintTotalsInformationComponent;
  let fixture: ComponentFixture<PrintTotalsInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintTotalsInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintTotalsInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
