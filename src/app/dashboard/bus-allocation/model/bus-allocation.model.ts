export interface BusAllocation {
  tripType: string;
  tripPlaceId: string; // Changed from tripPlace to tripPlaceId
  tripTimeRange: string;
  totalStudents: number;
  allocationDate: string;
  buses: Bus[];
}

export interface Bus {
  type: string;
  capacity: number;
  assigned: number;
}