import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private baseUrl = 'http://localhost:8080/tickets';
  private employeeUrl = 'http://localhost:8080/employees';

  constructor(private http: HttpClient) {}

  getTickets(): Observable<any[]> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.baseUrl+"/search", { headers });
  }

  getAssigneesByType(ticketType: string): Observable<any[]> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.employeeUrl}/assignees/by-type/${ticketType}`, { headers });
  }

  // Assign ticket to selected employee
  assignTicket(payload: any): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.employeeUrl}/assign`, payload, { headers });
  }

  getAllEmployees(): Observable<any[]> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(this.employeeUrl+"/list", { headers });
  }

  getAssignedTicketsByEmployee(employeeId: number): Observable<any[]> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`http://localhost:8080/tickets/assigned-tickets/${employeeId}`, { headers });
  }

  updateTicketStatus(ticketId: number, status: string): Observable<any> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`http://localhost:8080/tickets/update-status/${ticketId}`, { status }, { headers });
  }

  getAllAssignedTickets(): Observable<any[]> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>('http://localhost:8080/tickets/assign/tickets', { headers });
  }
}
