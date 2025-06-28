// students/models/auth.model.ts
export interface LoginRequest {
    identify: string;  
    password: string;
  }
  
  export interface RegisterRequest {
    name: string;
    identify: string;
    password: string;
    age: number;
    gender: string;
    email: string;
    fatherName: string;
    phoneNumber1: string;
    phoneNumber2: string; 
  }
  
  export interface AuthResponse {
    id: number;
    name: string;
    identify: string;
    fatherName: string;
    age: number;
    gender: string;
    email: string;
    phoneNumber1: string; // Changed from number to string
    phoneNumber2: string; // Changed from number to string
    admin: boolean;
    token: string;
  }