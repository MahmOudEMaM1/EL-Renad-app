import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ticket_Price } from './models/trip-price.model';
import { TicketServiceService } from './service/trip-sevice.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-trip-price',
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './trip-price.component.html',
  styleUrl: './trip-price.component.scss'
})
export class TripPriceComponent {
  ticketPrice: Ticket_Price[] = []; // Add this property
  @Output() ticketPriceSelected = new EventEmitter<number>();
  
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

    onSelect(event: Event): void {
      const select = event.target as HTMLSelectElement;
      const ticketPriceId = Number(select.value);
      if (ticketPriceId) {
        this.ticketPriceSelected.emit(ticketPriceId);
      }
    }
}
