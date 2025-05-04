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
  ticketStatuses: { [key: number]: string } = {}; // keyed by backend ticketId
  statusOptions = ['Open', 'In progress', 'On Hold', 'Close'];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    // Step 1: Get status info from backend (ticketId + status)
    this.ticketService.getAllAssignedTickets().subscribe(
      (assignedData: any[]) => {
        const statusMap = new Map<number, string>();
        assignedData.forEach(entry => {
          if (this.statusOptions.includes(entry.status)) {
            statusMap.set(entry.ticketId, entry.status);
          }
        });

        // Step 2: Get all tickets (model-generated)
        this.ticketService.getTickets().subscribe(
          (ticketData) => {
            this.tickets = ticketData.map((ticket, index) => {
              const backendId = ticket.ticketId || ticket.id || index + 1; // fallback if no ID
              const status = statusMap.get(backendId) || 'Open';

              this.ticketStatuses[backendId] = status;

              return {
                ...ticket,
                id: backendId,
                frontendId: `TC-${index + 1}`
              };
            });
          },
          error => console.error('Error fetching tickets:', error)
        );
      },
      error => console.error('Error fetching assigned ticket statuses:', error)
    );
  }

  filteredTickets(): any[] {
    const lowerSearch = this.searchText.toLowerCase();
    return this.tickets.filter(ticket => {
      const subject = ticket['Ticket Subject']?.toLowerCase() || '';
      const priority = ticket['Ticket Priority']?.toLowerCase() || '';
      const category = ticket['Predicted Ticket Type']?.toLowerCase() || '';
      const status = this.ticketStatuses[ticket.id]?.toLowerCase() || '';

      return (
        subject.includes(lowerSearch) ||
        priority.includes(lowerSearch) ||
        category.includes(lowerSearch) ||
        status.includes(lowerSearch)
      );
    });
  }

  getStatusClass(ticketId: number): string {
    const status = this.ticketStatuses[ticketId];
    switch (status) {
      case 'Open': return 'bg-secondary text-white';
      case 'In progress': return 'bg-warning text-dark';
      case 'On Hold': return 'bg-orange text-white';
      case 'Close': return 'bg-primary text-white';
      default: return 'bg-light text-dark';
    }
  }
}
