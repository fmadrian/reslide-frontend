import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCurrentUserComponent } from './update-current-user.component';

describe('UpdateCurrentUserComponent', () => {
  let component: UpdateCurrentUserComponent;
  let fixture: ComponentFixture<UpdateCurrentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCurrentUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCurrentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
