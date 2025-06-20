// home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../students/services/auth.service';
import { TripPlaceComponent } from '../trip-place/trip-place.component';
import { TripPriceComponent } from '../trip-price/trip-price.component';
import { TripTimeComponent } from '../trip-time/trip-time.component';
import { TripsComponent } from '../trips/trips.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    TripPlaceComponent,
    TripPriceComponent,
    TripTimeComponent,
    TripsComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // You could add any initialization logic here if needed
  }

  get currentUser() {
    return this.authService.currentUserValue;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}