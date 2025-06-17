import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'students', loadComponent: () => import('./students/student-list/student-list.component').then(m => m.StudentListComponent) },
  { path: '', redirectTo: '/students', pathMatch: 'full' }
];