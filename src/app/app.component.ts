import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './students/services/auth.service';
import { SplashComponent } from './splash/splash.component';

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
    // teset The splash screen is shown by default; navigation happens after splashComplete
  }

  onSplashComplete(completed: boolean): void {
    if (completed) {
      this.showSplash = false;
      // Handle navigation based on stored user
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.admin) {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      } else {
        this.router.navigate(['/login']);
      }
    }
  }
}