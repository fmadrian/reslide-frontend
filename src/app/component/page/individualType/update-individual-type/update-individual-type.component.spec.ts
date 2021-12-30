import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIndividualTypeComponent } from './update-individual-type.component';

describe('UpdateIndividualTypeComponent', () => {
  let component: UpdateIndividualTypeComponent;
  let fixture: ComponentFixture<UpdateIndividualTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateIndividualTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIndividualTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
