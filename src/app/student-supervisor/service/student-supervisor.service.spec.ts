import { TestBed } from '@angular/core/testing';

import { StudentSupervisorService } from './student-supervisor.service';

describe('StudentSupervisorService', () => {
  let service: StudentSupervisorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentSupervisorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
