import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip_place } from '../models/trip-place.model';

@Injectable({
  providedIn: 'root'
})
export class TripPlaceService {
  private apiUrl = 'https://elrenadtravels.runasp.net/api/trip/places';


  constructor(private http: HttpClient) { }

  getTripPlace(): Observable<Trip_place[]> {
      return this.http.get<Trip_place[]>(this.apiUrl);
    }
}
