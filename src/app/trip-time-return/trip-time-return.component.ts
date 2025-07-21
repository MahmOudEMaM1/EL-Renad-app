import { CommonModule, NgFor } from '@angular/common';
import { Component, Output, EventEmitter, Input, OnInit, OnDestroy } from '@angular/core';
import { Trip_Time_Return } from './model/trip-time-return.model';
import { TripTimeReturnService } from './service/trip-time-return.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-trip-time-return',
  imports: [NgFor, CommonModule, FormsModule, TranslateModule],
  templateUrl: './trip-time-return.component.html',
  styleUrl: './trip-time-return.component.scss'
})
export class TripTimeReturnComponent implements OnInit, OnDestroy {
  tripTimesReturns: Trip_Time_Return[] = [];
  disabledTimeIds: Set<number> = new Set();
  @Output() tripTimeReturnSelected = new EventEmitter<number>();
  @Input() isDisabled: boolean = true;
  
  private timeCheckSubscription: Subscription | null = null;
  
  constructor(private tripTimeReturnService: TripTimeReturnService) {}
  
  ngOnInit() {
    this.tripTimeReturnService.getTripTimeReturn().subscribe({
      next: (data) => {
        // Filter out the "لا يوجد" option (id = 9)
        this.tripTimesReturns = data.filter(time => time.id !== 9);
        this.updateDisabledTimes();
        
        // Set up interval to check every minute
        this.timeCheckSubscription = interval(60000).subscribe(() => {
          this.updateDisabledTimes();
        });
      },
      error: (err) => {
        console.error('Error fetching trip times:', err);
      }
    });
  }
  
  ngOnDestroy() {
    if (this.timeCheckSubscription) {
      this.timeCheckSubscription.unsubscribe();
    }
  }
  
  updateDisabledTimes() {
    // Get current Cairo time
    const cairoTime = this.getCurrentCairoTime();
    
    // Only apply disabling for PM hours (12:00 or later)
    if (cairoTime.hour < 12) {
      this.disabledTimeIds.clear();
      return;
    }
    
    this.disabledTimeIds.clear();
    
    this.tripTimesReturns.forEach(time => {
      // Parse the time (assuming format like "9:00" or "10:30")
      const timeParts = time.timeRange.split(':');
      if (timeParts.length >= 2) {
        const hour = parseInt(timeParts[0], 10);
        const minute = parseInt(timeParts[1], 10) || 0;
        
        // Convert both to minutes for easier comparison
        const optionTimeInMinutes = hour * 60 + minute;
        const currentTimeInMinutes = cairoTime.hour * 60 + cairoTime.minute;
        
        // If within 90 minutes (1:30) of the option time, disable
        if (optionTimeInMinutes - currentTimeInMinutes <= 90 && optionTimeInMinutes - currentTimeInMinutes > 0) {
          this.disabledTimeIds.add(time.id);
        }
        // If current time is past the option time, disable
        else if (currentTimeInMinutes >= optionTimeInMinutes) {
          this.disabledTimeIds.add(time.id);
        }
      }
    });
  }
  
  getCurrentCairoTime() {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Africa/Cairo',
      hour12: false,
      hour: 'numeric', 
      minute: 'numeric'
    };
    
    const timeString = new Date().toLocaleTimeString('en-US', options);
    const [hourStr, minuteStr] = timeString.split(':');
    
    return {
      hour: parseInt(hourStr, 10),
      minute: parseInt(minuteStr, 10)
    };
  }
  
  public isTimeDisabled(timeId: number): boolean {
    return this.isDisabled || this.disabledTimeIds.has(timeId);
  }
  
  onSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const tripTimeOutId = Number(select.value);
    if (tripTimeOutId >= 0) {
      this.tripTimeReturnSelected.emit(tripTimeOutId);
    }
  }
}