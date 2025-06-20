import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPlaceComponent } from './trip-place.component';

describe('TripPlaceComponent', () => {
  let component: TripPlaceComponent;
  let fixture: ComponentFixture<TripPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripPlaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
