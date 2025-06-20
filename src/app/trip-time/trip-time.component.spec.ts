import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripTimeComponent } from './trip-time.component';

describe('TripTimeComponent', () => {
  let component: TripTimeComponent;
  let fixture: ComponentFixture<TripTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
