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
  saveDisabled: { [key: number]: boolean } = {};

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
      customerName: ticket['Customer Name'],
      customerEmail: ticket['Customer Email'],
      employeeId: assigneeId
    };

    this.ticketService.assignTicket(payload).subscribe(
      () => {
        this.saveDisabled[ticket.frontendId] = true;
      },
      error => {
        console.error('Assignment failed:', error);
        // alert('Failed to assign ticket. Check server logs.');
      }
    );
  }

  onAssigneeChange(ticketId: number): void {
    this.saveDisabled[ticketId] = false;
  }
  // get filteredTickets() {
  //   return this.tickets.filter(ticket =>
  //     ticket['Predicted Ticket Type']?.toLowerCase().includes(this.searchText.toLowerCase())
  //   );
  // }

  get filteredTickets() {
    const lowerSearch = this.searchText.toLowerCase();

    return this.tickets.filter(ticket => {
      const frontendId = ticket.frontendId;
      const assigneeId = this.selectedAssignee[frontendId];
      const assigneeList = this.assignees[frontendId] || [];

      const selectedAssignee = assigneeList.find(emp => emp.id === assigneeId);
      const assigneeName = selectedAssignee?.name?.toLowerCase() || '';

      return assigneeName.includes(lowerSearch);
    });
  }
}
