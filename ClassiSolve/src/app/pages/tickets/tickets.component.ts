import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  tickets: any[] = [];
  searchText: string = '';

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data.map((ticket, index) => ({
          id: `TC-${index + 1}`,
          ...ticket
        }));
      },
      (error) => console.error('Error fetching tickets:', error)
    );
  }

  filteredTickets(): any[] {
    return this.tickets.filter(ticket =>
      ticket['Ticket Subject']?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
}
