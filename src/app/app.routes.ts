import { Routes } from '@angular/router';
import { StudentListComponent } from './students/student-list/student-list.component';
import { LoginComponent } from './students/login/login.component';
import { RegisterComponent } from './students/register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './students/guards/auth.guard';
import { AdminGuard } from './dashboard/guards/admin.guard';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: 'students', component: StudentListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];