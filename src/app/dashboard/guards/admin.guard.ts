// guards/admin.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../../students/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private router: Router, private authService: AuthService) {}
  
  canActivate() {
    const currentUser = this.authService.currentUserValue;
    
    if (currentUser && currentUser.admin) {
      return true;
    }
    
    // Not an admin, redirect to home page
    this.router.navigate(['/home']);
    return false;
  }
}