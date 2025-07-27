import { Component, OnInit, OnDestroy } from '@angular/core';
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
import { RegistrationRequest, RegistrationResponse } from './models/registration.model';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

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
    TranslateModule,
    MatIconModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  selectedTripType: number | null = null;
  selectedTripPlace: number | null = null;
  selectedOutboundTime: number | null = null;
  selectedReturnTime: number | null = null;
  selectedTicketPrice: number | null = null;
  isPriceDisabled: boolean = false;
  isOutboundTimeDisabled: boolean = true;
  isReturnTimeDisabled: boolean = true;
  currentTime: string = '';
  private timer: any;
  tripCount: number = 1;
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private tripRegistrationService: RegistrationService,
    private snackBar: MatSnackBar,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.updateCairoTime();
    this.timer = setInterval(() => this.updateCairoTime(), 1000);
  }

  get currentUser() {
    return this.authService.currentUserValue;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onTripTypeSelected(tripTypeId: number): void {
    this.selectedTripType = tripTypeId;
    if (tripTypeId === 3) { // "ذهاب و إياب"
      this.selectedTicketPrice = 3; // Default price id for 50
      this.isPriceDisabled = true;
      this.onTicketPriceSelected(1);
      this.isOutboundTimeDisabled = false;
      this.isReturnTimeDisabled = false;
    } else if (tripTypeId === 1) { // "ذهاب"
      this.selectedTicketPrice = 2; // Special price id for 25
      this.isPriceDisabled = true;
      this.onTicketPriceSelected(2);
      this.isOutboundTimeDisabled = false;
      this.isReturnTimeDisabled = true;
      this.selectedReturnTime = 9; // Set to "لا يوجد"
    } else if (tripTypeId === 2) { // "عودة"
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

  private updateCairoTime(): void {
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'Africa/Cairo',
      hour12: false,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    
    this.currentTime = new Date().toLocaleTimeString('en-EG', options);
  }

  incrementCount() {
    if (this.tripCount < 10) { 
      this.tripCount++;
    }
  }
  
  decrementCount() {
    if (this.tripCount > 1) {
      this.tripCount--;
    }
  }

  registerTrip(): void {
    if (!this.selectedTripType || !this.selectedTripPlace || !this.selectedTicketPrice) {
      this.snackBar.open(this.translate.instant('home.error_all_fields'), 'Close', {
        duration: 3000
      });
      return;
    }
  
    // Validate time selections based on trip type
    if (this.selectedTripType === 3 && (!this.selectedOutboundTime || !this.selectedReturnTime)) {
      this.snackBar.open(this.translate.instant('home.error_all_fields'), 'Close', {
        duration: 3000
      });
      return;
    }
  
    if ((this.selectedTripType === 2 && !this.selectedReturnTime) || 
        (this.selectedTripType === 1 && !this.selectedOutboundTime)) {
      this.snackBar.open(this.translate.instant('home.error_all_fields'), 'Close', {
        duration: 3000
      });
      return;
    }
  
    // Create array of registration requests
    const registrations: RegistrationRequest[] = Array(this.tripCount).fill(null).map(() => ({
      username: this.currentUser?.name || '',
      identify: this.currentUser?.identify || '',
      tripTypeId: this.selectedTripType!,
      tripPlaceId: this.selectedTripPlace!,
      outboundTripTimeId: this.selectedOutboundTime ?? 9,
      returnTripTimeId: this.selectedReturnTime ?? 9,
      phoneNumber1: this.currentUser?.phoneNumber1?.toString() || '',
      phoneNumber2: this.currentUser?.phoneNumber2?.toString() || '',
      pay: true,
      tiketPriceId: this.selectedTicketPrice!
    }));
  
    // Show loading state
    this.loading = true;
  
    this.tripRegistrationService.registerTrips(registrations).subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response.success) {
          this.snackBar.open(
            this.translate.instant('home.success_message_multi', { count: this.tripCount }),
            'Close', 
            { duration: 5000 }
          );
          // Reset form after successful submission
          this.tripCount = 1;
          this.selectedTripType = null;
          this.selectedTripPlace = null;
          this.selectedOutboundTime = null;
          this.selectedReturnTime = null;
          this.selectedTicketPrice = null;
        }
      },
      error: (error:any) => {
        this.loading = false;
        console.error('Registration error:', error);
        this.snackBar.open(
          this.translate.instant('home.error_message', { error: error.error?.message || 'Unknown error' }),
          'Close',
          { duration: 5000 }
        );
      }
    });
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}