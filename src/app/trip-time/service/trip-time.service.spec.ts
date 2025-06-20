import { TestBed } from '@angular/core/testing';

import { TripTimeService } from './trip-time.service';

describe('TripTimeService', () => {
  let service: TripTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
