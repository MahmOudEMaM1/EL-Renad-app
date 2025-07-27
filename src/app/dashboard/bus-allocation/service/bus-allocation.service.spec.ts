import { TestBed } from '@angular/core/testing';

import { BusAllocationService } from './bus-allocation.service';

describe('BusAllocationService', () => {
  let service: BusAllocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusAllocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
