// models/count.model.ts
export interface TripCount {
  tripPlaceId: number;
  tripPlaceName: string;
  tripType: string; // Changed from tripTypeName
  tripTimeId: number;
  tripTimeRange: string; // Changed from outboundTripTimeRange/returnTripTimeRange
  usernameCount: number;
}