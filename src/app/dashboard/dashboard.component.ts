import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../students/services/auth.service';
import { Dashboard_List } from './model/dashboard-list.model';
import { DashboardServiceService } from './servic/dashboard-service.service';
import { LanguageToggleComponent } from '../language-toggle/language-toggle.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { MatIconModule } from '@angular/material/icon';
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
    TranslateModule,
    FormsModule,
    MatIconModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  registrations: Dashboard_List[] = [];
  dataSource = new MatTableDataSource<Dashboard_List>();
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

  // Filter controls
  filterColumn: string = '';
  filterValue: string = '';

  // Summary statistics
  totalRegistrations: number = 0;
  totalPrice: number = 0;

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
        this.dataSource.data = data; // Set data to MatTableDataSource
        this.updateSummary(); // Update summary after loading data
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
          this.dataSource.data = [...this.registrations]; // Update data source
          this.updateSummary(); // Update summary after payment status change
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

  // Apply filter based on selected column and value
  applyFilter() {
    if (this.filterColumn && this.filterValue) {
      this.dataSource.filterPredicate = (data: Dashboard_List, filter: string) => {
        const value = this.getFilterValue(data, this.filterColumn);
        return value ? value.toString().toLowerCase().includes(filter.toLowerCase()) : false;
      };
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
      this.updateSummary(); // Update summary after applying filter
    } else {
      this.dataSource.filter = ''; // Clear filter if no column or value selected
      this.updateSummary(); // Update summary when filter is cleared
    }
  }

  // Helper to get the value of the selected column
  private getFilterValue(data: Dashboard_List, column: string): any {
    switch (column) {
      case 'username': return data.username;
      case 'tripTypeId': return data.tripType?.type;
      case 'tripPlaceId': return data.tripPlace?.name;
      case 'outboundTripTimeId': return data.outboundTripTime?.timeRange;
      case 'returnTripTimeId': return data.returnTripTime?.timeRange;
      case 'phoneNumber1': return data.phoneNumber1;
      case 'phoneNumber2': return data.phoneNumber2;
      case 'pay': return data.pay ? 'true' : 'false';
      case 'tiketPriceId': return data.tiketPrice?.price;
      default: return '';
    }
  }

  // Update summary statistics
  private updateSummary(): void {
    const filteredData = this.dataSource.filteredData;
    this.totalRegistrations = filteredData.length;
    this.totalPrice = filteredData.reduce((sum, reg) => sum + (reg.tiketPrice?.price || 0), 0);
  }

  exportToExcel(): void {
    // Prepare the data for export
    const exportData = this.dataSource.filteredData.map(reg => ({
      'Username': reg.username,
      'Trip Type': reg.tripType?.type || '',
      'Trip Place': reg.tripPlace?.name || '',
      'Outbound Time': reg.outboundTripTime?.timeRange || '',
      'Return Time': reg.returnTripTime?.timeRange || '',
      'Phone Number 1': reg.phoneNumber1,
      'Phone Number 2': reg.phoneNumber2,
      'Payment Status': reg.pay ? this.translate.instant('dashboard.paid') : this.translate.instant('dashboard.unpaid'),
      'Ticket Price': reg.tiketPrice?.price || 0
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');
    
    // Generate Excel file and download
    const fileName = `el-renad-registrations-${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  }
}