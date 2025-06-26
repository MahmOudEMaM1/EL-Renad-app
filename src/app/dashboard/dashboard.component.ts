import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../students/services/auth.service';
import { Dashboard_List } from './model/dashboard-list.model';
import { DashboardServiceService } from './servic/dashboard-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    MatTableModule, 
    MatProgressSpinnerModule, 
    MatButtonModule, 
    MatToolbarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  registrations: Dashboard_List[] = [];
  loading = true;
  error = '';
  displayedColumns: string[] = [
    'username', 
    'tripTypeId', 
    'tripPlaceId', 
    'outboundTripTimeId', 
    'returnTripTimeId', 
    'phoneNumber1', 
    'phoneNumber2', 
    'pay', 
    'tiketPriceId',
    'actions'  // Add this for the payment buttons
  ];
  
  constructor(
    private dashboardService: DashboardServiceService,
    private authService: AuthService,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.loadRegistrations();
  }
  
  get currentUser() {
    return this.authService.currentUserValue;
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  private loadRegistrations(): void {
    this.dashboardService.getRegistrationData().subscribe({
      next: (data) => {
        this.registrations = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load registrations. Please try again later.';
        this.loading = false;
        console.error('API Error:', err);
      }
    });
  }

  updatePaymentStatus(id: number, payStatus: boolean): void {
    this.loading = true;
    this.dashboardService.updatePaymentStatus(id, payStatus).subscribe({
      next: () => {
        // Update the local registration object
        const index = this.registrations.findIndex(reg => reg.id === id);
        if (index !== -1) {
          this.registrations[index].pay = payStatus;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to update payment status. Please try again.';
        this.loading = false;
        console.error('API Error:', err);
        // Reload the data to ensure consistency
        this.loadRegistrations();
      }
    });
  }
}