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
  disabledTimeIds: Set<number> = new Set();
  @Output() tripTimeOutSelected = new EventEmitter<number>();
  @Input() isDisabled: boolean = true;
  
  private timeCheckSubscription: Subscription | null = null;
  
  constructor(private tripTimeOutService: TripTimeOutService) {}
  
  ngOnInit() {
    this.tripTimeOutService.getTripTimeOut().subscribe({
      next: (data) => {
        // Filter out the "لا يوجد" option (id = 9)
        this.tripTimesOuts = data.filter(time => time.id !== 9);
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
    
    this.disabledTimeIds.clear();
    
    this.tripTimesOuts.forEach(time => {
      // Parse the start time from timeRange (assuming format "from X:00 to Y:00")
      const startHourMatch = time.timeRange.match(/from (\d+):00/);
      if (startHourMatch) {
        const startHour = parseInt(startHourMatch[1], 10);
        
        // If current Cairo hour is startHour-1, check minutes
        if (cairoTime.hour === startHour - 1 && cairoTime.minute > 0) {
          this.disabledTimeIds.add(time.id);
        }
        // If current Cairo hour >= startHour, disable
        else if (cairoTime.hour >= startHour) {
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
  
  // Make sure this is public
  public isTimeDisabled(timeId: number): boolean {
    return this.isDisabled || this.disabledTimeIds.has(timeId);
  }
  
  onSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const tripTimeOutId = Number(select.value);
    if (tripTimeOutId >= 0) {
      this.tripTimeOutSelected.emit(tripTimeOutId);
    }
  }
}