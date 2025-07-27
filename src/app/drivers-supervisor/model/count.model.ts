export interface TripCount {
    tripPlaceId: number;
    tripPlaceName: string;
    tripType: 'Outbound' | 'Return'; 
    tripTimeId: number | null; 
    tripTimeRange: string; 
    usernameCount: number; 
  }