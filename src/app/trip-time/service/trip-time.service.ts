import { Injectable } from '@angular/core';
import { Trip_Time } from '../modal/trip-time.modal';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TripTimeService {
  private apiUrl = 'https://elrenadtravels.runasp.net/api/trip/times';

  constructor(private http: HttpClient) { }

  getTripTime(): Observable<Trip_Time[]>{
    return this.http.get<Trip_Time[]>(this.apiUrl)
  }
}
