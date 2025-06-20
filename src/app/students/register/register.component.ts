// students/register/register.component.ts
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
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error = '';
  image2Path = '../assets/image2.png';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(5), Validators.max(100)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fatherName: ['', Validators.required],
      phoneNumber1: ['', [Validators.required, Validators.pattern("^[0-9]{10,12}$")]],
      phoneNumber2: ['', Validators.pattern("^[0-9]{10,12}$")]
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.error = '';
    this.authService.register(this.registerForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/home']); // Changed from '/students' to '/home'
        },
        error: error => {
          this.error = error.error || 'Registration failed. Please try again.';
          this.loading = false;
        }
      });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}