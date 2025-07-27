import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../students/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DriverSupervisorGuard implements CanActivate {
  
  constructor(private router: Router, private authService: AuthService) {}
  
  canActivate() {
    const currentUser = this.authService.currentUserValue;
    console.log('Guard Check - Admin Value:', currentUser?.admin);
    if (currentUser && currentUser.admin === 'driver-supervisor') {
      return true;
    }
    
    console.warn('Access denied - redirecting to home');
    this.router.navigate(['/home']);
    return false;
  }
}