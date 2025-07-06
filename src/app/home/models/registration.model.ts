// models/registration.model.ts
export interface RegistrationRequest {
  username: string;
  identify: string;
  tripTypeId: number;
  tripPlaceId: number;
  outboundTripTimeId: number;
  returnTripTimeId: number;
  phoneNumber1: string;
  phoneNumber2: string;
  pay: boolean;
  tiketPriceId: number;
}

export interface RegistrationResponse {
  id: number;
  success: boolean;
  message: string;
}