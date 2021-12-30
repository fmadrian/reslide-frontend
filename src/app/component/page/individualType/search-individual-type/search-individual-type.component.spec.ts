import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIndividualTypeComponent } from './search-individual-type.component';

describe('SearchIndividualTypeComponent', () => {
  let component: SearchIndividualTypeComponent;
  let fixture: ComponentFixture<SearchIndividualTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchIndividualTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchIndividualTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
