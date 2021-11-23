import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMeasurementTypeComponent } from './update-measurement-type.component';

describe('UpdateMeasurementTypeComponent', () => {
  let component: UpdateMeasurementTypeComponent;
  let fixture: ComponentFixture<UpdateMeasurementTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMeasurementTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMeasurementTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
