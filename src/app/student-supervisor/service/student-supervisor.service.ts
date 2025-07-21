import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TripCount } from '../model/count.model';

@Injectable({
  providedIn: 'root'
})
export class StudentSupervisorService {
  private apiUrl = 'https://elrenadtravels.runasp.net/api/registration/counts';

  constructor(private http: HttpClient) { }

  getTripCounts(): Observable<TripCount[]> {
    return this.http.get<TripCount[]>(this.apiUrl);
  }
}