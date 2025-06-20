import { TestBed } from '@angular/core/testing';

import { TripSeviceService } from './trip-sevice.service';

describe('TripSeviceService', () => {
  let service: TripSeviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripSeviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
