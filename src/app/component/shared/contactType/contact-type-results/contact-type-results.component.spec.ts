import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTypeResultsComponent } from './contact-type-results.component';

describe('ContactTypeResultsComponent', () => {
  let component: ContactTypeResultsComponent;
  let fixture: ComponentFixture<ContactTypeResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactTypeResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactTypeResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
