import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { Trip_Time_Out } from './modal/trip-time-out.modal';
import { TripTimeOutService } from './service/trip-time-out.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-trip-time',
  imports: [NgFor, CommonModule, FormsModule, TranslateModule],
  templateUrl: './trip-time-out.component.html',
  styleUrl: './trip-time-out.component.scss'
})
export class TripTimeOutComponent implements OnInit, OnDestroy {
  tripTimesOuts: Trip_Time_Out[] = [];
  disabledTimeIds: number[] = [];
  private timeCheckInterval: any;
  private timeCheckSubscription: Subscription | null = null;
  
  @Output() tripTimeOutSelected = new EventEmitter<number>();
  @Input() isDisabled: boolean = true;
  
  constructor(private tripTimeOutService: TripTimeOutService) {}
  
  ngOnInit() {
    this.tripTimeOutService.getTripTimeOut().subscribe({
      next: (data) => {
        this.tripTimesOuts = data.filter(time => time.id !== 9);
        
        // Initial check
        this.updateDisabledTimes();
        
        // Check every minute
        this.timeCheckInterval = setInterval(() => {
          this.updateDisabledTimes();
        }, 60000);
      },
      error: (err) => {
        console.error('Error fetching trip times:', err);
      }
    });
  }
  
  ngOnDestroy() {
    if (this.timeCheckInterval) {
      clearInterval(this.timeCheckInterval);
    }
  }
  
  onSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const tripTimeOutId = Number(select.value);
    if (tripTimeOutId >= 0) {
      this.tripTimeOutSelected.emit(tripTimeOutId);
    }
  }
  
  getCairoTime(): Date {
    // Get current time in Cairo (UTC+2)
    const now = new Date();
    const cairoOffset = 2 * 60; // Cairo is UTC+2 (in minutes)
    const localOffset = now.getTimezoneOffset(); // Local timezone offset in minutes
    
    // Adjust for Cairo time
    const cairoTime = new Date(now.getTime() + (cairoOffset + localOffset) * 60000);
    return cairoTime;
  }
  
  // In trip-time-out.component.ts
isTimeDisabled(timeRange: string): boolean {
  // Get current Cairo time
  const now = new Date();
  const cairoOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'Africa/Cairo',
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  
  const cairoTimeStr = now.toLocaleTimeString('en-EG', cairoOptions);
  const [cairoHours, cairoMinutes] = cairoTimeStr.split(':').map(Number);
  
  // Parse the timeRange (e.g., "2:00") 
  const timeHour = parseInt(timeRange.split(':')[0], 10);
  
  // Assume PM for times 1-7 if they're less than current hour (handles wraparound to next day)
  const adjustedTimeHour = (timeHour < 8) ? timeHour + 12 : timeHour;
  
  // Calculate current time in minutes since midnight
  const currentMinutes = cairoHours * 60 + cairoMinutes;
  
  // Calculate option time in minutes since midnight
  const optionMinutes = adjustedTimeHour * 60;
  
  // Reset at midnight
  if (cairoHours === 0 && cairoMinutes < 5) {
    return false;
  }
  
  // If time has passed or is less than 90 minutes away, disable
  if (currentMinutes > optionMinutes) {
    // Time has already passed today
    return true;
  } else {
    // Check if time is less than 90 minutes away
    return (optionMinutes - currentMinutes) < 90;
  }
}
  
  updateDisabledTimes(): void {
    this.disabledTimeIds = [];
    this.tripTimesOuts = [...this.tripTimesOuts];
    this.tripTimesOuts.forEach(time => {
      if (this.isTimeDisabled(time.timeRange)) {
        this.disabledTimeIds.push(time.id);
      }
    });
  }
}