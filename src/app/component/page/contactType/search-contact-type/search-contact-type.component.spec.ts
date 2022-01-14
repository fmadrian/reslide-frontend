import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchContactTypeComponent } from './search-contact-type.component';

describe('SearchContactTypeComponent', () => {
  let component: SearchContactTypeComponent;
  let fixture: ComponentFixture<SearchContactTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchContactTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchContactTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
