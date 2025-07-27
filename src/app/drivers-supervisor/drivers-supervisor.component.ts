import { Component, OnInit } from '@angular/core';
import { DriversSupervisorService } from './service/drivers-supervisor.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgFor, NgIf, KeyValuePipe } from '@angular/common';
import { AuthService } from '../students/services/auth.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BusAllocationDto } from './model/bus-allocation.model';
import { TripCount } from './model/count.model';

@Component({
  selector: 'app-drivers-supervisor',
  standalone: true,
  templateUrl: './drivers-supervisor.component.html',
  styleUrls: ['./drivers-supervisor.component.scss'],
  imports: [
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgIf,
    NgFor,
    KeyValuePipe,
    MatButtonModule,
    MatBadgeModule,
    MatTooltipModule,
    LanguageToggleComponent,
    TranslateModule
  ]
})
export class DriversSupervisorComponent implements OnInit {
  counts: TripCount[] = [];
  loading = true;
  error = '';
  groupedOutbound: { [key: string]: TripCount } = {};
  groupedReturn: { [key: string]: TripCount } = {};

  constructor(
    public service: DriversSupervisorService,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCounts();
  }

  private loadCounts(): void {
    this.service.getTripCounts().subscribe({
      next: (data) => {
        this.counts = data;
        this.loading = false;
        const outboundTrips = data.filter(trip => trip.tripType === "Outbound" && trip.tripTimeRange && trip.tripTimeRange !== "لا يوجد");
        this.groupedOutbound = this.groupAndAggregate(outboundTrips, 'tripTimeRange', 'tripPlaceName');
        const returnTrips = data.filter(trip => trip.tripType === "Return" && trip.tripTimeRange && trip.tripTimeRange !== "لا يوجد");
        this.groupedReturn = this.groupAndAggregate(returnTrips, 'tripTimeRange', 'tripPlaceName');
        data.forEach(trip => {
          this.service.updateTripCount(trip);
        });
      },
      error: (err) => {
        this.error = 'Failed to load trip statistics';
        this.loading = false;
      }
    });
  }

  private groupAndAggregate(arr: TripCount[], timeKey: keyof TripCount, placeKey: keyof TripCount): { [key: string]: TripCount } {
    const groups: { [key: string]: TripCount } = {};
    arr.forEach(item => {
      const time = item[timeKey] || 'لا يوجد';
      const place = item[placeKey] || 'لا يوجد';
      const groupKey = `${time} - ${place}`;
      if (!groups[groupKey]) {
        groups[groupKey] = { ...item, usernameCount: 0 };
      }
      groups[groupKey].usernameCount += item.usernameCount;
      groups[groupKey].tripPlaceId = groups[groupKey].tripPlaceId || item.tripPlaceId;
      groups[groupKey].tripType = groups[groupKey].tripType || item.tripType;
      groups[groupKey].tripTimeId = groups[groupKey].tripTimeId || item.tripTimeId;
    });
    return groups;
  }

  addLargeBus(trip: TripCount): void {
    this.service.addBus(trip, 'large');
  }

  addSmallBus(trip: TripCount): void {
    this.service.addBus(trip, 'small');
  }

  removeBus(trip: TripCount, busId: number): void {
    this.service.removeBus(trip, busId);
  }

  optimizeAllocation(trip: TripCount): void {
    this.service.optimizeAllocation(trip);
  }

  saveAllAllocations(): void {
    const allocations: BusAllocationDto[] = Object.values({ ...this.groupedOutbound, ...this.groupedReturn }).map(trip => {
      const allocation = this.service.getBusAllocation(trip);
      return {
        tripType: trip.tripType === 'Outbound' ? 'ذهاب' : 'عودة',
        tripPlaceId: trip.tripPlaceId,
        tripTimeRange: trip.tripTimeRange || 'لا يوجد',
        totalStudents: trip.usernameCount,
        buses: allocation.buses.map(bus => ({
          type: bus.type,
          capacity: bus.capacity,
          assigned: bus.assigned
        }))
      };
    });

    // Log the request body to the console
    console.log('Sending allocations:', JSON.stringify(allocations, null, 2));

    this.service.saveAllocations(allocations).subscribe({
      next: () => {
        this.snackBar.open(
          this.translate.instant('driver_supervisor.allocations_saved'),
          'Close',
          { duration: 3000 }
        );
      },
      error: (err) => {
        this.snackBar.open(
          this.translate.instant('driver_supervisor.save_error'),
          'Close',
          { duration: 5000 }
        );
        console.error('Save error:', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}