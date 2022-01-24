import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductTypeComponent } from './search-product-type.component';

describe('SearchProductTypeComponent', () => {
  let component: SearchProductTypeComponent;
  let fixture: ComponentFixture<SearchProductTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProductTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProductTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
