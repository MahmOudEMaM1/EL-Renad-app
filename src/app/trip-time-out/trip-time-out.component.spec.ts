import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripTimeOutComponent } from './trip-time-out.component';

describe('TripTimeComponent', () => {
  let component: TripTimeOutComponent;
  let fixture: ComponentFixture<TripTimeOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripTimeOutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripTimeOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
