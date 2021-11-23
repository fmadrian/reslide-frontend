import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasurementTypeFormComponent } from './measurement-type-form.component';

describe('MeasurementTypeFormComponent', () => {
  let component: MeasurementTypeFormComponent;
  let fixture: ComponentFixture<MeasurementTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasurementTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
