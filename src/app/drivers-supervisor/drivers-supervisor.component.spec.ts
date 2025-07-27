import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversSupervisorComponent } from './drivers-supervisor.component';

describe('DriversSupervisorComponent', () => {
  let component: DriversSupervisorComponent;
  let fixture: ComponentFixture<DriversSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriversSupervisorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
