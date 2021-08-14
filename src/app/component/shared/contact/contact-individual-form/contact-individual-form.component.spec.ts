import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactIndividualFormComponent } from './contact-individual-form.component';

describe('ContactIndividualFormComponent', () => {
  let component: ContactIndividualFormComponent;
  let fixture: ComponentFixture<ContactIndividualFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactIndividualFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactIndividualFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
