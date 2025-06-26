import { Injectable } from '@angular/core';
import { Trip_Time_Return } from '../model/trip-time-return.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TripTimeReturnService {
  private apiUrl = 'https://elrenadtravels.runasp.net/api/trip/times/return';

  constructor(private http: HttpClient) { }

  getTripTimeReturn(): Observable<Trip_Time_Return[]>{
    return this.http.get<Trip_Time_Return[]>(this.apiUrl)
  }
}
