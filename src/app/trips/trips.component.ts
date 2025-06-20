import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TripService } from './services/trip.service';
import { Trip_Type } from './models/tribType.model';



@Component({
  selector: 'app-trips',
  imports: [NgFor, CommonModule],
  standalone: true,
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.scss'
})
export class TripsComponent implements OnInit{
  tripTypes: Trip_Type[] = []; // Add this property

  constructor(private tripTypesService: TripService) {}

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
}
