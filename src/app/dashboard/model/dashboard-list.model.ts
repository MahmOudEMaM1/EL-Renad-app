export interface Dashboard_List {
    id: number;
    username: string;
    tripTypeId: number;
    tripType: {
      id: number;
      type: string;
    };
    tripPlaceId: number;
    tripPlace: {
      id: number;
      name: string;
    };
    outboundTripTimeId: number;
    outboundTripTime: {
      id: number;
      timeRange: string;
      direction: number;
    };
    returnTripTimeId: number;
    returnTripTime: {
      id: number;
      timeRange: string;
      direction: number;
    };
    phoneNumber1: string;
    phoneNumber2: string;
    pay: boolean;
    tiketPriceId: number;
    tiketPrice: {
      id: number;
      name: string;
      price: number;
    };
  }