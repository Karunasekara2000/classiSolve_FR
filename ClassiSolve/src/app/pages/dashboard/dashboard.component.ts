import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  tickets = [
    { title: 'User Account Issue', status: 'OPEN' },
    { title: 'Authentication Issue', status: 'OPEN' },
    { title: 'I can’t type the password', status: 'OPEN' },
    { title: 'Password Not Working', status: 'OPEN' },
    { title: 'System is super slow today.', status: 'OPEN' }
  ];

  assignees = [
    { name: 'Tom David', email: 'David@gmail.com' },
    { name: 'Angi Perera', email: 'Angi@gmail.com' },
    { name: 'John Danial', email: 'John@gmail.com' },
    { name: 'Hafsa Husni', email: 'Hafsa@gmail.com' },
    { name: 'Alice Berly', email: 'Berly@gmail.com' }
  ];

  recentTicket = {
    user: 'Brad Mason',
    submitted: 'Nov 14, 2021 08:00',
    title: 'Password reset not working',
    issue: 'Hi, Login’s not letting me in. It says “Error checking updates” when I tried to input my username and password. Please help.'
  };
}
