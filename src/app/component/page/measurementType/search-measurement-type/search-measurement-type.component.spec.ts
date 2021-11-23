import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMeasurementTypeComponent } from './search-measurement-type.component';

describe('SearchMeasurementTypeComponent', () => {
  let component: SearchMeasurementTypeComponent;
  let fixture: ComponentFixture<SearchMeasurementTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMeasurementTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMeasurementTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
