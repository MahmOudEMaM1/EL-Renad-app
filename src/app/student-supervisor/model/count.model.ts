// models/count.model.ts
export interface TripCount {
    tripTypeId: number;
    tripTypeName: string;
    tripPlaceId: number;
    tripPlaceName: string;
    outboundTripTimeId: number;
    outboundTripTimeRange: string;
    returnTripTimeId: number;
    returnTripTimeRange: string;
    usernameCount: number;
  }