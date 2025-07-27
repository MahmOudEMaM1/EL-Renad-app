import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusAllocationComponent } from './bus-allocation.component';

describe('BusAllocationComponent', () => {
  let component: BusAllocationComponent;
  let fixture: ComponentFixture<BusAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusAllocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
