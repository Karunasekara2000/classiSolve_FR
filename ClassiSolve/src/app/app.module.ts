import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { TicketsComponent } from './pages/tickets/tickets.component';
import { AssignTicketComponent } from './pages/assign-ticket/assign-ticket.component';
import { EmployeeWorkspaceComponent } from './pages/employee-workspace/employee-workspace.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    MainLayoutComponent,
    SidebarComponent,
    DashboardComponent,
    TicketsComponent,
    AssignTicketComponent,
    EmployeeWorkspaceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
