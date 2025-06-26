import { Component ,OnInit,Output, EventEmitter} from '@angular/core';
import { Trip_Time_Out } from './modal/trip-time-out.modal';
import { TripTimeOutService } from './service/trip-time-out.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-trip-time',
  imports: [NgFor, CommonModule, FormsModule,TranslateModule],
  templateUrl: './trip-time-out.component.html',
  styleUrl: './trip-time-out.component.scss'
})
export class TripTimeOutComponent {
  tripTimesOuts: Trip_Time_Out[] = []; // Add this property
  
    constructor(private tripTimeOutService: TripTimeOutService) {}
    @Output() tripTimeOutSelected = new EventEmitter<number>();

    ngOnInit() {
      this.tripTimeOutService.getTripTimeOut().subscribe({
        next: (data) => {
          this.tripTimesOuts = data;
        },
        error: (err) => {
          console.error('Error fetching trip times:', err);
        }
      });
    }

    onSelect(event: Event): void {
      const select = event.target as HTMLSelectElement;
      const tripTimeOutId = Number(select.value);
      if (tripTimeOutId) {
        this.tripTimeOutSelected.emit(tripTimeOutId);
      }
    }

}
