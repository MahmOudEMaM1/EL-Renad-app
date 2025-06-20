import { CommonModule, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Ticket_Price } from './models/trip-price.model';
import { TicketServiceService } from './service/trip-sevice.service';
@Component({
  selector: 'app-trip-price',
  imports: [NgFor, CommonModule],
  templateUrl: './trip-price.component.html',
  styleUrl: './trip-price.component.scss'
})
export class TripPriceComponent {
  ticketPrice: Ticket_Price[] = []; // Add this property
  
    constructor(private ticketPriceService: TicketServiceService) {}
  
    ngOnInit() {
      this.ticketPriceService.getTicketPrice().subscribe({
        next: (data) => {
          this.ticketPrice = data;
        },
        error: (err) => {
          console.error('Error fetching trip places:', err);
        }
      });
    }
}
