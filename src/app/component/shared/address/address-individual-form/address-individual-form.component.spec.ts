import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressIndividualFormComponent } from './address-individual-form.component';

describe('AddressIndividualFormComponent', () => {
  let component: AddressIndividualFormComponent;
  let fixture: ComponentFixture<AddressIndividualFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressIndividualFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressIndividualFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
