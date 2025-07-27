// student-supervisor.component.ts
import { Component, OnInit } from '@angular/core';
import { StudentSupervisorService } from './service/student-supervisor.service';
import { TripCount } from './model/count.model';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../students/services/auth.service';
import { Router } from '@angular/router';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-student-supervisor',
  standalone: true,
  templateUrl: './student-supervisor.component.html',
  styleUrl: './student-supervisor.component.scss',
  imports: [MatCard, MatCardModule, MatIconModule, MatProgressSpinnerModule, NgIf, NgFor,LanguageToggleComponent,TranslateModule]
})
export class StudentSupervisorComponent implements OnInit {
  outboundTrips: TripCount[] = [];
  returnTrips: TripCount[] = [];
  loading = true;
  error = '';

  constructor(
    private service: StudentSupervisorService,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadCounts();
  }

  private loadCounts(): void {
    this.service.getTripCounts().subscribe({
      next: (data) => {
        this.outboundTrips = data.filter(trip => trip.tripType.toLowerCase() === 'outbound');
        this.returnTrips = data.filter(trip => trip.tripType.toLowerCase() === 'return');
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load trip statistics';
        this.loading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}