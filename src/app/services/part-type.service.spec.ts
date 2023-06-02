import { TestBed } from '@angular/core/testing';

import { PartTypeService } from './part-type.service';

describe('PartTypeService', () => {
  let service: PartTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
