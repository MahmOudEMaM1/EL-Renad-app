import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './students/services/auth.service';
import { SplashComponent } from './splash/splash.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SplashComponent],
  template: `
    <app-splash (splashComplete)="onSplashComplete($event)" *ngIf="showSplash"></app-splash>
    <router-outlet *ngIf="!showSplash"></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'EL-Renad-app';
  showSplash = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to currentUser$ to handle navigation after login
    this.authService.currentUser$.pipe(
      filter(user => user !== null) // Only proceed when user data is available
    ).subscribe(user => {
      if (user.admin === 'admin') {
        this.router.navigate(['/dashboard']);
      } else if (user.admin === 'user') {
        this.router.navigate(['/home']);
      } else if (user.admin === 'student-supervisor') {
        this.router.navigate(['/student-supervisor']);
      }
    });
  }

  onSplashComplete(completed: boolean): void {
    if (completed) {
      this.showSplash = false;
      // Initial navigation if no user is set yet
      const storedUser = this.authService.currentUserValue;
      if (!storedUser) {
        this.router.navigate(['/login']);
      }
    }
  }
}