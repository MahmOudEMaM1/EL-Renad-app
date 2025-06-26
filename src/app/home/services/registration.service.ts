// services/registration.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationRequest, RegistrationResponse } from '../models/registration.model';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private apiUrl = 'https://elrenadtravels.runasp.net/api/registration/register';

  constructor(private http: HttpClient) { }

  registerTrip(registrationData: RegistrationRequest): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(this.apiUrl, registrationData);
  }
}