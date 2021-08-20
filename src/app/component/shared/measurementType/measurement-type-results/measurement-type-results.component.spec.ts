import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementTypeResultsComponent } from './measurement-type-results.component';

describe('MeasurementTypeResultsComponent', () => {
  let component: MeasurementTypeResultsComponent;
  let fixture: ComponentFixture<MeasurementTypeResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurementTypeResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementTypeResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
