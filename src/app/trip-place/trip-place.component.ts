import { Component, OnInit } from '@angular/core';
import { TripPlaceService } from './service/trip-place.service';
import { Trip_place } from './models/trip-place.model';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-trip-place',
  imports: [NgFor, CommonModule],
  templateUrl: './trip-place.component.html',
  styleUrl: './trip-place.component.scss'
})
export class TripPlaceComponent implements OnInit {
  tripPlaces: Trip_place[] = []; // Add this property

  constructor(private tripPlaceService: TripPlaceService) {}

  ngOnInit() {
    this.tripPlaceService.getTripPlace().subscribe({
      next: (data) => {
        this.tripPlaces = data;
      },
      error: (err) => {
        console.error('Error fetching trip places:', err);
      }
    });
  }
}
