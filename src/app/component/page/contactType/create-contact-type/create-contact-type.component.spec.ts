import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContactTypeComponent } from './create-contact-type.component';

describe('CreateContactTypeComponent', () => {
  let component: CreateContactTypeComponent;
  let fixture: ComponentFixture<CreateContactTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateContactTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContactTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
