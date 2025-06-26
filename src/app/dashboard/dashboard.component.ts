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
  import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';
  import { TranslateModule, TranslateService } from '@ngx-translate/core';

  @Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
      CommonModule,
      MatTableModule,
      MatProgressSpinnerModule,
      MatButtonModule,
      MatToolbarModule,
      LanguageToggleComponent,
      TranslateModule
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
      'actions'
    ];

    constructor(
      private dashboardService: DashboardServiceService,
      private authService: AuthService,
      private router: Router,
      private translate: TranslateService
    ) {}

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
          this.error = this.translate.instant('dashboard.error');
          this.loading = false;
          console.error('API Error:', err);
        }
      });
    }

    updatePaymentStatus(id: number, payStatus: boolean): void {
      this.loading = true;
      this.dashboardService.updatePaymentStatus(id, payStatus).subscribe({
        next: () => {
          const index = this.registrations.findIndex(reg => reg.id === id);
          if (index !== -1) {
            this.registrations[index].pay = payStatus;
          }
          this.loading = false;
        },
        error: (err) => {
          this.error = this.translate.instant('dashboard.update_error');
          this.loading = false;
          console.error('API Error:', err);
          this.loadRegistrations();
        }
      });
    }
  }