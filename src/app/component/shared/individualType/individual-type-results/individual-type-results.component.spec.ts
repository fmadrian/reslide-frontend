import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualTypeResultsComponent } from './individual-type-results.component';

describe('IndividualTypeResultsComponent', () => {
  let component: IndividualTypeResultsComponent;
  let fixture: ComponentFixture<IndividualTypeResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualTypeResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualTypeResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
