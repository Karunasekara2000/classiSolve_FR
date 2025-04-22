import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-assign-ticket',
  templateUrl: './assign-ticket.component.html',
  styleUrls: ['./assign-ticket.component.css']
})
export class AssignTicketComponent implements OnInit {
  tickets: any[] = [];
  assignees: { [key: number]: any[] } = {};
  selectedAssignee: { [key: number]: number } = {};
  searchText: string = '';

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      data => {
        this.tickets = data.map((ticket, index) => ({
          frontendId: index + 1,
          ...ticket
        }));
        this.tickets.forEach(ticket => this.loadAssignees(ticket));
      },
      error => console.error('Error loading tickets:', error)
    );
  }

  loadAssignees(ticket: any): void {
    this.ticketService.getAssigneesByType(ticket['Predicted Ticket Type']).subscribe(
      data => {
        this.assignees[ticket.frontendId] = data;

        // Auto-set the first assignee as default if none is selected yet
        if (data.length > 0 && !this.selectedAssignee[ticket.frontendId]) {
          this.selectedAssignee[ticket.frontendId] = data[0].id;
        }
      },
      error => console.error('Error loading assignees:', error)
    );
  }


  assign(ticket: any): void {
    const assigneeId = this.selectedAssignee[ticket.frontendId];

    console.log(assigneeId);
    const payload = {
      ticketId: ticket.frontendId,
      ticketSubject: ticket['Predicted Ticket Type'],
      ticketType: ticket['Predicted Ticket Type'],
      resolutionTime: ticket['Predicted Resolution Time (hrs)'],
      employeeId: assigneeId
    };

    this.ticketService.assignTicket(payload).subscribe(
      () => alert(`Ticket "${ticket['Ticket Subject']}" assigned to ${assigneeId}!`),
      error => {
        console.error('Assignment failed:', error);
        alert('Failed to assign ticket. Check server logs.');
      }
    );
  }

  get filteredTickets() {
    return this.tickets.filter(ticket =>
      ticket['Ticket Subject']?.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  testClick() {
    console.log('Test click is working!');
  }
}
