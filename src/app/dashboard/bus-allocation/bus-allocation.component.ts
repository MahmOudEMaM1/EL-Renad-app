import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../students/services/auth.service';
import { Bus, BusAllocation } from './model/bus-allocation.model';
import { BusAllocationService } from './service/bus-allocation.service';
import { LanguageToggleComponent } from '../../language-toggle/language-toggle.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-bus-allocation',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    LanguageToggleComponent,
    TranslateModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './bus-allocation.component.html',
  styleUrl: './bus-allocation.component.scss'
})
export class BusAllocationComponent implements OnInit {
  allocations: BusAllocation[] = [];
  dataSource = new MatTableDataSource<BusAllocation>();
  loading = true;
  error = '';
  displayedColumns: string[] = [
    'tripType',
    'tripPlace',
    'tripTimeRange',
    'totalStudents',
    'allocationDate',
    'buses'
  ];

  // Filter controls
  filterColumn: string = '';
  filterValue: string = '';

  constructor(
    private busAllocationService: BusAllocationService,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.loadAllocations();
  }

  get currentUser() {
    return this.authService.currentUserValue;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  private loadAllocations(): void {
    this.busAllocationService.getBusAllocations().subscribe({
      next: (data) => {
        this.allocations = data;
        this.dataSource.data = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = this.translate.instant('bus_allocation.error');
        this.loading = false;
        console.error('API Error:', err);
      }
    });
  }

  applyFilter(): void {
    if (this.filterColumn && this.filterValue) {
      this.dataSource.filterPredicate = (data: BusAllocation, filter: string) => {
        const value = this.getFilterValue(data, this.filterColumn);
        return value ? value.toString().toLowerCase().includes(filter.toLowerCase()) : false;
      };
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
    } else {
      this.dataSource.filter = '';
    }
  }

  private getFilterValue(data: BusAllocation, column: string): any {
    switch (column) {
      case 'tripType': return data.tripType;
      case 'tripPlace': return data.tripPlaceId;
      case 'tripTimeRange': return data.tripTimeRange;
      case 'totalStudents': return data.totalStudents;
      case 'buses': return this.formatBuses(data.buses);
      case 'allocationDate':
        const date = new Date(data.allocationDate);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      default: return '';
    }
  }

  formatBuses(buses: Bus[]): string {
    if (buses.length > 0) {
      return buses.map(bus => `${bus.type} (${bus.capacity})`).join(', ');
    }
    return this.translate.instant('bus_allocation.no_buses');
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}