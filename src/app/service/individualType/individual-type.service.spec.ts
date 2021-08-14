import { TestBed } from '@angular/core/testing';

import { IndividualTypeService } from './individual-type.service';

describe('IndividualTypeService', () => {
  let service: IndividualTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndividualTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
