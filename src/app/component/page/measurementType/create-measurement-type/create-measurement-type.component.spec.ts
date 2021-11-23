import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMeasurementTypeComponent } from './create-measurement-type.component';

describe('CreateMeasurementTypeComponent', () => {
  let component: CreateMeasurementTypeComponent;
  let fixture: ComponentFixture<CreateMeasurementTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMeasurementTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMeasurementTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
