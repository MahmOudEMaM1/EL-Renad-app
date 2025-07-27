import { Routes } from '@angular/router';
import { StudentListComponent } from './students/student-list/student-list.component';
import { LoginComponent } from './students/login/login.component';
import { RegisterComponent } from './students/register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './students/guards/auth.guard';
import { AdminGuard } from './dashboard/guards/admin.guard';
import { StudentSupervisorComponent } from './student-supervisor/student-supervisor.component';
import { StudentSupervisorGuard } from './student-supervisor/guards/student-supervisor.guard';
import { DriverSupervisorGuard } from './drivers-supervisor/guards/driver-supervisor.guard';
import { DriversSupervisorComponent } from './drivers-supervisor/drivers-supervisor.component';
import { BusAllocationComponent } from './dashboard/bus-allocation/bus-allocation.component';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'students', component: StudentListComponent, canActivate: [AuthGuard] },
  { 
    path: 'student-supervisor',
    component: StudentSupervisorComponent,
    canActivate: [AuthGuard, StudentSupervisorGuard] 
  },
  { 
    path: 'driver-supervisor', 
    component:DriversSupervisorComponent,
    canActivate: [DriverSupervisorGuard]
  },
  { path: 'bus-allocation', component: BusAllocationComponent, canActivate: [AdminGuard] },
  { path: '**', redirectTo: '/login' }
];