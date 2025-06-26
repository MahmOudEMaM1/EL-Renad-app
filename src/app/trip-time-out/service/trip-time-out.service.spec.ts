import { TestBed } from '@angular/core/testing';

import { TripTimeOutService } from './trip-time-out.service';

describe('TripTimeService', () => {
  let service: TripTimeOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripTimeOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
