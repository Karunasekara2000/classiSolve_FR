import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LandingComponent} from "./pages/landing/landing.component";
import {LoginComponent} from "./pages/login/login.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {TicketsComponent} from "./pages/tickets/tickets.component";
import {AssignTicketComponent} from "./pages/assign-ticket/assign-ticket.component";
import {EmployeeWorkspaceComponent} from "./pages/employee-workspace/employee-workspace.component";


const routes: Routes = [
  {path:'',redirectTo:'landing',pathMatch:'full'},
  {path:'landing',component:LandingComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  // Authenticated routes using the main layout
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'tickets', component: TicketsComponent },
      { path: 'assign-ticket', component: AssignTicketComponent },
      { path: 'employee-workspace', component: EmployeeWorkspaceComponent },
      //{ path: 'patient-management', component: PatientManagementComponent },
      //{ path: 'patient-record', component: PatientRecordComponent },
      //ManagementComponent },
      // Add other authenticated routes here, e.g., patient management, settings, etc.
    ]
  },

  { path: '**', redirectTo: 'landing' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
