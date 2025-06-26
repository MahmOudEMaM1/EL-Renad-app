// home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../students/services/auth.service';
import { TripPlaceComponent } from '../trip-place/trip-place.component';
import { TripPriceComponent } from '../trip-price/trip-price.component';
import { TripTimeOutComponent } from '../trip-time-out/trip-time-out.component';
import { TripsComponent } from '../trips/trips.component';
import { TripTimeReturnComponent } from '../trip-time-return/trip-time-return.component';
import { RegistrationService } from './services/registration.service';
import { RegistrationRequest } from './models/registration.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSnackBarModule,
    TripPlaceComponent,
    TripPriceComponent,
    TripTimeOutComponent,
    TripTimeReturnComponent,
    TripsComponent,

  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Selected values from dropdowns
  selectedTripType: number | null = null;
  selectedTripPlace: number | null = null;
  selectedOutboundTime: number | null = null;
  selectedReturnTime: number | null = null;
  selectedTicketPrice: number | null = null;
  
  constructor(
    private authService: AuthService,
    private tripRegistrationService: RegistrationService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  get currentUser() {
    return this.authService.currentUserValue;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // These methods will be called from the child components
  onTripTypeSelected(tripTypeId: number): void {
    this.selectedTripType = tripTypeId;
  }

  onTripPlaceSelected(tripPlaceId: number): void {
    this.selectedTripPlace = tripPlaceId;
  }

  onOutboundTimeSelected(timeId: number): void {
    this.selectedOutboundTime = timeId;
  }

  onReturnTimeSelected(timeId: number): void {
    this.selectedReturnTime = timeId;
  }

  onTicketPriceSelected(priceId: number): void {
    this.selectedTicketPrice = priceId;
  }

  registerTrip(): void {
    // Validate all required fields are selected
    if (!this.selectedTripType || !this.selectedTripPlace || 
        !this.selectedOutboundTime || !this.selectedReturnTime || 
        !this.selectedTicketPrice) {
      this.snackBar.open('Please select all trip details before registering', 'Close', {
        duration: 3000
      });
      return;
    }

    // Create registration request
    const registrationData: RegistrationRequest = {
      username: this.currentUser?.name || '',
      tripTypeId: this.selectedTripType,
      tripPlaceId: this.selectedTripPlace,
      outboundTripTimeId: this.selectedOutboundTime,
      returnTripTimeId: this.selectedReturnTime,
      phoneNumber1: this.currentUser?.phoneNumber1?.toString() || '',
      phoneNumber2: this.currentUser?.phoneNumber2?.toString() || '',
      pay: true, // Default to true, can be made configurable if needed
      tiketPriceId: this.selectedTicketPrice
    };

    // Send registration request
    this.tripRegistrationService.registerTrip(registrationData).subscribe({
      next: (response) => {
        this.snackBar.open('Trip registered successfully!', 'Close', {
          duration: 3000
        });
      },
      error: (error) => {
        this.snackBar.open('Failed to register trip: ' + (error.error || 'Unknown error'), 'Close', {
          duration: 5000
        });
      }
    });
  }
}