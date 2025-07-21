// guards/student-supervisor.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../students/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class StudentSupervisorGuard implements CanActivate {
  
  constructor(private router: Router, private authService: AuthService) {}
  
  // guards/student-supervisor.guard.ts
canActivate() {
    const currentUser = this.authService.currentUserValue;
    console.log('Guard Check - Admin Value:', currentUser?.admin);
    if (currentUser && currentUser.admin === 'student-supervisor') { // Remove toLowerCase()
      return true;
    }
    
    console.warn('Access denied - redirecting to home');
    this.router.navigate(['/home']); // Fix redirect target
    return false;
  }
}