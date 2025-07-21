import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LanguageToggleComponent } from '../../language-toggle/language-toggle.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ReactiveFormsModule,
    LanguageToggleComponent,
    TranslateModule,
    MatToolbarModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error = '';
  image2Path = '../assets/image2.png';
  selectedPhoto: File | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private translate: TranslateService
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      identify: ['', Validators.required],
      password: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fatherName: ['', Validators.required],
      phoneNumber1: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      phoneNumber2: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      photo: [null]
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (file.size > 5 * 1024 * 1024) {
        this.error = this.translate.instant('register.photo_size_error');
        return;
      }
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        this.error = this.translate.instant('register.photo_type_error');
        return;
      }
      this.selectedPhoto = file;
      this.registerForm.patchValue({ photo: this.selectedPhoto });
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      const { name, identify, password, age, gender, email, fatherName, phoneNumber1, phoneNumber2, photo } = this.registerForm.value;
      const registerData: any = { name, identify, password, age, gender, email, fatherName, phoneNumber1, phoneNumber2 };
      if (this.selectedPhoto) {
        registerData.photo = this.selectedPhoto;
      }
      this.authService.register(registerData).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.loading = false;
        },
        error: (err) => {
          this.error = this.translate.instant('register.error');
          this.loading = false;
        }
      });
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}