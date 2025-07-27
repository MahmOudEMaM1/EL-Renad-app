import { TestBed } from '@angular/core/testing';

import { DriversSupervisorService } from './drivers-supervisor.service';

describe('DriversSupervisorService', () => {
  let service: DriversSupervisorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriversSupervisorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
