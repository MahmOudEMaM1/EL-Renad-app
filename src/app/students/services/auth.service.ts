import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://elrenadtravels.runasp.net/api/auth';
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          if (user.admin) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        })
      );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('identify', userData.identify);
    formData.append('password', userData.password);
    formData.append('fatherName', userData.fatherName);
    formData.append('age', userData.age.toString());
    formData.append('gender', userData.gender);
    formData.append('email', userData.email);
    formData.append('phoneNumber1', userData.phoneNumber1);
    formData.append('phoneNumber2', userData.phoneNumber2);
    formData.append('photo', userData.photo);


    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, formData)
      .pipe(
        tap(user => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          if (user.admin) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/home']);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  get currentUserValue(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.currentUserValue;
  }

  get token(): string | null {
    return this.currentUserValue?.token || null;
  }
}