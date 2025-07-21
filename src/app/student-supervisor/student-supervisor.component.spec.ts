import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentSupervisorComponent } from './student-supervisor.component';

describe('StudentSupervisorComponent', () => {
  let component: StudentSupervisorComponent;
  let fixture: ComponentFixture<StudentSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentSupervisorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
