// students/models/auth.model.ts
export interface LoginRequest {
    name: string;
    password: string;
  }
  
  export interface RegisterRequest {
    name: string;
    password: string;
    age: number;
    gender: string;
    email: string;
    fatherName: string;
    phoneNumber1: string;
    phoneNumber2: string; // Optional
  }
  
  export interface AuthResponse {
    id: number;
    name: string;
    academicYear: number;
    token: string;
  }