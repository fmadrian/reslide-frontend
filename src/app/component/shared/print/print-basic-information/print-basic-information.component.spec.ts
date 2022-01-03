import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintBasicInformationComponent } from './print-basic-information.component';

describe('PrintBasicInformationComponent', () => {
  let component: PrintBasicInformationComponent;
  let fixture: ComponentFixture<PrintBasicInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintBasicInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintBasicInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
