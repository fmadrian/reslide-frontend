import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualTypeFormComponent } from './individual-type-form.component';

describe('IndividualTypeFormComponent', () => {
  let component: IndividualTypeFormComponent;
  let fixture: ComponentFixture<IndividualTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndividualTypeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
