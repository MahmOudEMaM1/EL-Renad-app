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
  photo: File; // New property for photo
}

export interface AuthResponse {
  id: number;
  name: string;
  identify: string;
  fatherName: string;
  age: number;
  gender: string;
  email: string;
  phoneNumber1: string;
  phoneNumber2: string;
  admin: string;
  token: string;
  photo: string; // Base64 string for the photo
}