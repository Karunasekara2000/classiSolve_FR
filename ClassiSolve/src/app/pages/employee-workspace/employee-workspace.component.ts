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

        data.forEach(ticket => {
          this.ticketStatuses[ticket.ticketId] = ticket.status || 'Open';
        });

        // Sort so "Close" tickets go to the bottom
        this.assignedTickets = data.sort((a, b) => {
          const statusA = this.statusPriority[a.status || 'Open'] || 99;
          const statusB = this.statusPriority[b.status || 'Open'] || 99;
          return statusA - statusB;
        });
      },
      error => console.error('Error fetching assigned tickets:', error)
    );
  }


  toggleDropdown(ticketId: number): void {
    this.dropdownOpen[ticketId] = !this.dropdownOpen[ticketId];
  }



  statusPriority: { [key: string]: number } = {
    'Open': 1,
    'In progress': 2,
    'On Hold': 3,
    'Close': 4
  };

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
          const statusA = this.statusPriority[a.status || 'Open'] || 99;
          const statusB = this.statusPriority[b.status || 'Open'] || 99;
          return statusA - statusB;
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
