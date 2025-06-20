import { Injectable } from '@angular/core';
import { Ticket_Price } from '../models/trip-price.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketServiceService{
  private apiUrl = 'https://elrenadtravels.runasp.net/api/tiket-pirce';

  constructor(private http: HttpClient) { }

  getTicketPrice(): Observable<Ticket_Price[]>{
    return this.http.get<Ticket_Price[]>(this.apiUrl)
  }
}
