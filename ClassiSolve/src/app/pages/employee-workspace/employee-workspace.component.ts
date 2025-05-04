import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-employee-workspace',
  templateUrl: './employee-workspace.component.html',
  styleUrls: ['./employee-workspace.component.css']
})
export class EmployeeWorkspaceComponent implements OnInit {
  employees: any[] = [];
  assignedTickets: any[] = [];
  selectedEmployeeId: number | null = null;
  dropdownOpen: { [key: number]: boolean } = {};
  ticketStatuses: { [key: number]: string } = {};
  statusOptions = ['Open', 'In progress', 'On Hold', 'Close'];

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getAllEmployees().subscribe(
      data => this.employees = data,
      error => console.error('Error loading employees:', error)
    );
  }

  onEmployeeChange(): void {
    if (this.selectedEmployeeId === null || this.selectedEmployeeId === undefined) return;

    this.ticketService.getAssignedTicketsByEmployee(this.selectedEmployeeId).subscribe(
      data => {
        // Update ticketStatuses map from backend values
        data.forEach(ticket => {
          this.ticketStatuses[ticket.ticketId] = ticket.status || 'Open';
        });

        // Sort so "Close" tickets go to the bottom
        this.assignedTickets = data.sort((a, b) => {
          const statusA = a.status || 'Open';
          const statusB = b.status || 'Open';

          if (statusA === 'Close' && statusB !== 'Close') return 1;
          if (statusA !== 'Close' && statusB === 'Close') return -1;
          return 0;
        });
      },
      error => console.error('Error fetching assigned tickets:', error)
    );
  }



  toggleDropdown(ticketId: number): void {
    this.dropdownOpen[ticketId] = !this.dropdownOpen[ticketId];
  }



  // setStatus(ticketId: number, status: string): void {
  //   this.ticketStatuses = { ...this.ticketStatuses, [ticketId]: status };
  //
  //
  //   // Re-sort tickets: move 'Close' to bottom
  //   this.assignedTickets.sort((a, b) => {
  //     const statusA = this.ticketStatuses[a.ticketId] || 'Open';
  //     const statusB = this.ticketStatuses[b.ticketId] || 'Open';
  //
  //     if (statusA === 'Close' && statusB !== 'Close') return 1;
  //     if (statusA !== 'Close' && statusB === 'Close') return -1;
  //     return 0;
  //   });
  // }

  setStatus(ticketId: number, status: string): void {
    this.ticketStatuses[ticketId] = status;

    // Update in the assignedTickets array too (UI sync)
    const ticket = this.assignedTickets.find(t => t.ticketId === ticketId);
    if (ticket) ticket.status = status;

    // Update in backend
    this.ticketService.updateTicketStatus(ticketId, status).subscribe({
      next: () => {
        console.log("Status updated");

        // Optional: Re-sort after change
        this.assignedTickets.sort((a, b) => {
          const statusA = a.status || 'Open';
          const statusB = b.status || 'Open';
          if (statusA === 'Close' && statusB !== 'Close') return 1;
          if (statusA !== 'Close' && statusB === 'Close') return -1;
          return 0;
        });
      },
      error: err => console.error("Failed to update status", err)
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Open':
        return 'bg-secondary text-white';
      case 'In progress':
        return 'bg-warning text-dark';
      case 'On Hold':
        return 'bg-orange text-white';
      case 'Close':
        return 'bg-primary text-white';
      default:
        return 'bg-light text-dark';
    }

  }




}
