// app.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { SplashComponent } from './splash/splash.component';
import { AuthService } from './students/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SplashComponent],
  template: `
    <app-splash *ngIf="showSplash" (splashComplete)="onSplashComplete()"></app-splash>
    <router-outlet *ngIf="!showSplash"></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EL-Renad-app';
  showSplash = true;

  constructor(private authService: AuthService, private router: Router) {}

  onSplashComplete(): void {
    this.showSplash = false;
    
    // Navigate based on authentication status
    if (this.authService.isLoggedIn) {
      this.router.navigate(['/students']);
    }
  }
}