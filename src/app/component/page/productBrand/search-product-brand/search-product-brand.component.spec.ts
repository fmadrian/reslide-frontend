import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProductBrandComponent } from './search-product-brand.component';

describe('SearchProductBrandComponent', () => {
  let component: SearchProductBrandComponent;
  let fixture: ComponentFixture<SearchProductBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchProductBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProductBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
