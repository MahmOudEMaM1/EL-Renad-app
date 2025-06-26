import { TestBed } from '@angular/core/testing';

import { TripTimeReturnService } from './trip-time-return.service';

describe('TripTimeReturnService', () => {
  let service: TripTimeReturnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripTimeReturnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
