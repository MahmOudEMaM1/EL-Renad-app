// app.routes.ts
import { Routes } from '@angular/router';
import { StudentListComponent } from './students/student-list/student-list.component';
import { LoginComponent } from './students/login/login.component';
import { RegisterComponent } from './students/register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './students/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'students', component: StudentListComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];