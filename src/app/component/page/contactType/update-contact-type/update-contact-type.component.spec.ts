import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContactTypeComponent } from './update-contact-type.component';

describe('UpdateContactTypeComponent', () => {
  let component: UpdateContactTypeComponent;
  let fixture: ComponentFixture<UpdateContactTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateContactTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateContactTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
