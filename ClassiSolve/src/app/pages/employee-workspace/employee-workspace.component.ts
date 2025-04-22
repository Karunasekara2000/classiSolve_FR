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

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getAllEmployees().subscribe(
      data => this.employees = data,
      error => console.error('Error loading employees:', error)
    );
  }

  onEmployeeChange(): void {
    console.log('Selected Employee ID:', this.selectedEmployeeId, typeof this.selectedEmployeeId);

    if (this.selectedEmployeeId === null || this.selectedEmployeeId === undefined) return;

    this.ticketService.getAssignedTicketsByEmployee(this.selectedEmployeeId).subscribe(
      data => {
        this.assignedTickets = data;
        console.log('Assigned Tickets:', data);
      },
      error => console.error('Error fetching assigned tickets:', error)
    );
  }
}
