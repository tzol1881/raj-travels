import { TestBed } from '@angular/core/testing';

import { PartInventoryService } from './part-inventory.service';

describe('PartInventoryService', () => {
  let service: PartInventoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartInventoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
