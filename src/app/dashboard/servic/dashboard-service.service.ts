import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dashboard_List } from '../model/dashboard-list.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {
  private apiUrl = 'https://elrenadtravels.runasp.net/api/registration';
  
  constructor(private http: HttpClient) { }
  
  getRegistrationData(): Observable<Dashboard_List[]> {
    return this.http.get<Dashboard_List[]>(`${this.apiUrl}/details`);
  }
  
  updatePaymentStatus(id: number, payStatus: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatePayment/${id}`, { pay: payStatus });
  }
}