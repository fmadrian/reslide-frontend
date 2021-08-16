import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchIndividualComponent } from './search-individual.component';

describe('SearchIndividualComponent', () => {
  let component: SearchIndividualComponent;
  let fixture: ComponentFixture<SearchIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
