
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip_Type } from '../models/tribType.model';
@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'https://elrenadtravels.runasp.net/api/trip/types';

  constructor(private http: HttpClient) { }

  getTrips(): Observable<Trip_Type[]> {
    return this.http.get<Trip_Type[]>(this.apiUrl);
  }
}

