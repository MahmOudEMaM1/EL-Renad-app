import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Ticket_Price } from './models/trip-price.model';
import { TicketServiceService } from './service/trip-sevice.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-trip-price',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule, TranslateModule],
  templateUrl: './trip-price.component.html',
  styleUrl: './trip-price.component.scss'
})
export class TripPriceComponent implements OnInit {
  ticketPrice: Ticket_Price[] = [];
  @Output() ticketPriceSelected = new EventEmitter<number>();
  @Input() isPriceDisabled: boolean = false;
  @Input() selectedTicketPrice: number | null = null;

  constructor(private ticketPriceService: TicketServiceService) {}

  ngOnInit() {
    this.ticketPriceService.getTicketPrice().subscribe({
      next: (data) => {
        this.ticketPrice = data;
      },
      error: (err) => {
        console.error('Error fetching ticket prices:', err);
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