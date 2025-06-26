import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './students/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EL-Renad-app';

  constructor(private authService: AuthService, private router: Router) {
    // Handle initial navigation based on stored user
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.admin) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/home']);
      }
    }
  }
}