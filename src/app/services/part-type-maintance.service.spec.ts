import { TestBed } from '@angular/core/testing';

import { PartTypeMaintanceService } from './part-type-maintance.service';

describe('PartTypeMaintanceService', () => {
  let service: PartTypeMaintanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartTypeMaintanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
