import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIndividualTypeComponent } from './create-individual-type.component';

describe('CreateIndividualTypeComponent', () => {
  let component: CreateIndividualTypeComponent;
  let fixture: ComponentFixture<CreateIndividualTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIndividualTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIndividualTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
