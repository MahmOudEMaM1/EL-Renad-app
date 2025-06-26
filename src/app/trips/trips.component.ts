import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TripService } from './services/trip.service';
import { Trip_Type } from './models/tribType.model';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core'; // Add this import

@Component({
  selector: 'app-trips',
  imports: [NgFor, CommonModule, FormsModule, TranslateModule], // Add TranslateModule
  standalone: true,
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.scss'
})
export class TripsComponent implements OnInit {
  tripTypes: Trip_Type[] = [];
  
  constructor(private tripTypesService: TripService) {}
  @Output() tripTypeSelected = new EventEmitter<number>();
  
  ngOnInit() {
    this.tripTypesService.getTrips().subscribe({
      next: (data) => {
        this.tripTypes = data;
      },
      error: (err) => {
        console.error('Error fetching trip places:', err);
      }
    });
  }
  
  onSelect(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const tripTypeId = Number(select.value);
    if (tripTypeId) {
      this.tripTypeSelected.emit(tripTypeId);
    }
  }
}