import { Injectable } from '@angular/core';
import { Trip_Time_Out } from '../modal/trip-time-out.modal';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TripTimeOutService {
  private apiUrl = 'https://elrenadtravels.runasp.net/api/trip/times/outbound';

  constructor(private http: HttpClient) { }

  getTripTimeOut(): Observable<Trip_Time_Out[]>{
    return this.http.get<Trip_Time_Out[]>(this.apiUrl)
  }
}
