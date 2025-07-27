export interface Bus {
    type: 'large' | 'small';
    capacity: number;
    assigned: number;
    id: number; // Unique ID for each bus
}

export interface TripBusAllocation {
    tripId: string;
    buses: Bus[];
    totalStudents: number;
    remainingStudents: number;
}

export interface BusAllocationDto {
    tripType: 'Outbound' | 'Return' | 'ذهاب' | 'عودة'; // Updated to include Arabic values
    tripPlaceId: number;
    tripTimeRange: string; // Changed from tripTimeId to tripTimeRange
    totalStudents: number;
    buses: BusAllocationDetailDto[];
}

export interface BusAllocationDetailDto {
    type: 'large' | 'small';
    capacity: number;
    assigned: number;
}