import { CommonModule, NgFor } from '@angular/common';
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Trip_Time_Return } from './model/trip-time-return.model';
import { TripTimeReturnService } from './service/trip-time-return.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-trip-time-return',
  imports: [NgFor, CommonModule, FormsModule, TranslateModule],
  templateUrl: './trip-time-return.component.html',
  styleUrl: './trip-time-return.component.scss'
})
export class TripTimeReturnComponent {
  tripTimesReturns: Trip_Time_Return[] = [];
  @Output() tripTimeReturnSelected = new EventEmitter<number>();
  @Input() isDisabled: boolean = true;
  
  constructor(private tripTimeReturnService: TripTimeReturnService) {}
  
  ngOnInit() {
    this.tripTimeReturnService.getTripTimeReturn().subscribe({
      next: (data) => {
        // Filter out the "لا يوجد" option (id = 9)
        this.tripTimesReturns = data.filter(time => time.id !== 9);
      },
      error: (err) => {
        console.error('Error fetching trip times:', err);
      }
    });
  }
  
  onSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const tripTimeOutId = Number(select.value);
    if (tripTimeOutId >= 0) {
      this.tripTimeReturnSelected.emit(tripTimeOutId);
    }
  }
}