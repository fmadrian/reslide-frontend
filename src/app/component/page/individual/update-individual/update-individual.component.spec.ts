import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIndividualComponent } from './update-individual.component';

describe('UpdateIndividualComponent', () => {
  let component: UpdateIndividualComponent;
  let fixture: ComponentFixture<UpdateIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
