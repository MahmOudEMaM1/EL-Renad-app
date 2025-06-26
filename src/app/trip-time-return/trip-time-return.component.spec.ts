import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripTimeReturnComponent } from './trip-time-return.component';

describe('TripTimeReturnComponent', () => {
  let component: TripTimeReturnComponent;
  let fixture: ComponentFixture<TripTimeReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripTimeReturnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripTimeReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
