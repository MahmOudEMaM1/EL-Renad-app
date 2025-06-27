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
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    LanguageToggleComponent,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selectedTripType: number | null = null;
  selectedTripPlace: number | null = null;
  selectedOutboundTime: number | null = null;
  selectedReturnTime: number | null = null;
  selectedTicketPrice: number | null = null;
  isPriceDisabled: boolean = false;
  isOutboundTimeDisabled: boolean = true;
  isReturnTimeDisabled:boolean = true;

  constructor(
    private authService: AuthService,
    private tripRegistrationService: RegistrationService,
    private snackBar: MatSnackBar,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {}

  get currentUser() {
    return this.authService.currentUserValue;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onTripTypeSelected(tripTypeId: number): void {
    this.selectedTripType = tripTypeId;
    // Automatically set price based on trip type and emit the selection
    if (tripTypeId === 1) { // "ذهاب و إياب"
      this.selectedTicketPrice = 1; // Default price id for 50
      this.isPriceDisabled = true;
      this.onTicketPriceSelected(1);
      this.isOutboundTimeDisabled = false;
      this.isReturnTimeDisabled = false;
    } else if (tripTypeId === 3) { // "ذهاب"
      this.selectedTicketPrice = 2; // Special price id for 25
      this.isPriceDisabled = true;
      this.onTicketPriceSelected(2);
      this.isOutboundTimeDisabled = false;
      this.isReturnTimeDisabled = true;
      this.selectedReturnTime = 9; // Set to "لا يوجد"
    } else if (tripTypeId === 2) { // "إياب"
      this.selectedTicketPrice = 2; // Special price id for 25
      this.isPriceDisabled = true;
      this.onTicketPriceSelected(2);
      this.isOutboundTimeDisabled = true;
      this.isReturnTimeDisabled = false;
      this.selectedOutboundTime = 9; // Set to "لا يوجد"
    } else {
      this.selectedTicketPrice = null;
      this.isPriceDisabled = false;
      this.isOutboundTimeDisabled = true;
      this.isReturnTimeDisabled = true;
      this.selectedOutboundTime = 9; // Set to "لا يوجد"
      this.selectedReturnTime = 9; // Set to "لا يوجد"
    }
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
    if (!this.selectedTripType || !this.selectedTripPlace || !this.selectedTicketPrice) {
      this.snackBar.open(this.translate.instant('home.error_all_fields'), 'Close', {
        duration: 3000
      });
      return;
    }

    // Conditional validation based on trip type
    if (this.selectedTripType === 1) {
      if (!this.selectedOutboundTime || !this.selectedReturnTime) {
        this.snackBar.open(this.translate.instant('home.error_all_fields'), 'Close', {
          duration: 3000
        });
        return;
      }
    } else if (this.selectedTripType === 2) {
      if (!this.selectedReturnTime) {
        this.snackBar.open(this.translate.instant('home.error_all_fields'), 'Close', {
          duration: 3000
        });
        return;
      }
    } else if (this.selectedTripType === 3) {
      if (!this.selectedOutboundTime) {
        this.snackBar.open(this.translate.instant('home.error_all_fields'), 'Close', {
          duration: 3000
        });
        return;
      }
    }

    const registrationData: RegistrationRequest = {
      username: this.currentUser?.name || '',
      tripTypeId: this.selectedTripType,
      tripPlaceId: this.selectedTripPlace,
      outboundTripTimeId: this.selectedOutboundTime || 9,
      returnTripTimeId: this.selectedReturnTime || 9,
      phoneNumber1: this.currentUser?.phoneNumber1?.toString() || '',
      phoneNumber2: this.currentUser?.phoneNumber2?.toString() || '',
      pay: true,
      tiketPriceId: this.selectedTicketPrice
    };

    this.tripRegistrationService.registerTrip(registrationData).subscribe({
      next: (response) => {
        this.snackBar.open(this.translate.instant('home.success_message'), 'Close', {
          duration: 3000
        });
      },
      error: (error) => {
        this.snackBar.open(this.translate.instant('home.error_message', {error: error.error || 'Unknown error'}), 'Close', {
          duration: 5000
        });
      }
    });
  }
}