// students/models/auth.model.ts
export interface LoginRequest {
    name: string;
    password: string;
  }
  
  export interface RegisterRequest {
    name: string;
    password: string;
    academicYear: number;
  }
  
  export interface AuthResponse {
    id: number;
    name: string;
    academicYear: number;
    token: string;
  }