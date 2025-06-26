import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../services/auth.service';
import { LanguageToggleComponent } from '../../language-toggle/language-toggle.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; // Add TranslateService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    LanguageToggleComponent,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';
  image2Path = '../assets/image2.png'; 

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private translate: TranslateService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // login.component.ts
onSubmit(): void {
  if (this.loginForm.invalid) {
    return;
  }
  this.loading = true;
  this.error = '';
  
  this.authService.login(this.loginForm.value)
    .subscribe({
      next: () => {
        this.loading = false;
      },
      error: error => {
        // Use translation key instead of hardcoded error
        this.error = error.error || 'login.error';
        this.loading = false;
      }
    });
}

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}