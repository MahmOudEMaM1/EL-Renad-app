import { TestBed } from '@angular/core/testing';

import { TripPlaceService } from './trip-place.service';

describe('TripPlaceService', () => {
  let service: TripPlaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripPlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
