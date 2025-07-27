import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusAllocation } from '../model/bus-allocation.model';

@Injectable({
  providedIn: 'root'
})
export class BusAllocationService {
  private apiUrl = 'https://elrenadtravels.runasp.net/api/registration/busallocations';

  constructor(private http: HttpClient) {}

  getBusAllocations(): Observable<BusAllocation[]> {
    return this.http.get<BusAllocation[]>(this.apiUrl);
  }
}