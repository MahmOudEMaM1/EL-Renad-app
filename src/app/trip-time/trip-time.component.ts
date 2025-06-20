import { Component } from '@angular/core';
import { Trip_Time } from './modal/trip-time.modal';
import { TripTimeService } from './service/trip-time.service';
import { CommonModule, NgFor } from '@angular/common';
@Component({
  selector: 'app-trip-time',
  imports: [NgFor, CommonModule],
  templateUrl: './trip-time.component.html',
  styleUrl: './trip-time.component.scss'
})
export class TripTimeComponent {
  tripTimes: Trip_Time[] = []; // Add this property
  
    constructor(private tripTimeService: TripTimeService) {}
  
    ngOnInit() {
      this.tripTimeService.getTripTime().subscribe({
        next: (data) => {
          this.tripTimes = data;
        },
        error: (err) => {
          console.error('Error fetching trip times:', err);
        }
      });
    }

}
