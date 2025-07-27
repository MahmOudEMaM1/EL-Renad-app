import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TripBusAllocation, Bus, BusAllocationDto } from '../model/bus-allocation.model';
import { TripCount } from '../model/count.model';

@Injectable({
  providedIn: 'root'
})
export class DriversSupervisorService {
  private apiUrl = 'https://elrenadtravels.runasp.net/api/registration';
  private busAllocations = new Map<string, TripBusAllocation>();
  private busCounter = 0;

  constructor(private http: HttpClient) {}

  getTripCounts(): Observable<TripCount[]> {
    return this.http.get<TripCount[]>(`${this.apiUrl}/counts`);
  }

  private getTripId(trip: TripCount): string {
    const tripId = `${trip.tripPlaceId}-${trip.tripType}-${trip.tripTimeId || '0'}`;
    return tripId;
  }

  updateTripCount(trip: TripCount): void {
    const tripId = this.getTripId(trip);
    if (!this.busAllocations.has(tripId)) {
      this.busAllocations.set(tripId, {
        tripId,
        buses: [],
        totalStudents: trip.usernameCount,
        remainingStudents: trip.usernameCount
      });
    } else {
      const allocation = this.busAllocations.get(tripId)!;
      const totalAssigned = allocation.buses.reduce((sum, bus) => sum + bus.assigned, 0);
      allocation.totalStudents = trip.usernameCount;
      allocation.remainingStudents = trip.usernameCount - totalAssigned;
      this.busAllocations.set(tripId, allocation);
    }
  }

  getBusAllocation(trip: TripCount): TripBusAllocation {
    const tripId = this.getTripId(trip);
    
    if (!this.busAllocations.has(tripId)) {
      this.busAllocations.set(tripId, {
        tripId,
        buses: [],
        totalStudents: trip.usernameCount,
        remainingStudents: trip.usernameCount
      });
    } else {
      const allocation = this.busAllocations.get(tripId)!;
      if (allocation.totalStudents !== trip.usernameCount) {
        const totalAssigned = allocation.buses.reduce((sum, bus) => sum + bus.assigned, 0);
        allocation.totalStudents = trip.usernameCount;
        allocation.remainingStudents = trip.usernameCount - totalAssigned;
        this.busAllocations.set(tripId, allocation);
      }
    }
    
    return this.busAllocations.get(tripId)!;
  }

  addBus(trip: TripCount, busType: 'large' | 'small'): void {
    const allocation = this.getBusAllocation(trip);
    const capacity = busType === 'large' ? 33 : 28;
    
    const toAssign = Math.min(allocation.remainingStudents, capacity);
    
    allocation.buses.push({
      type: busType,
      capacity,
      assigned: toAssign,
      id: ++this.busCounter
    });
    
    allocation.remainingStudents -= toAssign;
    this.busAllocations.set(allocation.tripId, allocation);
  }

  removeBus(trip: TripCount, busId: number): void {
    const allocation = this.getBusAllocation(trip);
    const busIndex = allocation.buses.findIndex(b => b.id === busId);
    
    if (busIndex >= 0) {
      allocation.remainingStudents += allocation.buses[busIndex].assigned;
      allocation.buses.splice(busIndex, 1);
      this.busAllocations.set(allocation.tripId, allocation);
    }
  }

  optimizeAllocation(trip: TripCount): void {
    const allocation = this.getBusAllocation(trip);
    
    let totalStudents = allocation.totalStudents;
    allocation.remainingStudents = totalStudents;
    allocation.buses = [];
    
    while (allocation.remainingStudents > 0) {
      const busType = allocation.remainingStudents >= 33 ? 'large' : 'small';
      const capacity = busType === 'large' ? 33 : 28;
      const toAssign = Math.min(allocation.remainingStudents, capacity);
      allocation.buses.push({
        type: busType,
        capacity,
        assigned: toAssign,
        id: ++this.busCounter
      });
      allocation.remainingStudents -= toAssign;
    }
    
    this.busAllocations.set(allocation.tripId, allocation);
  }

  getTotalBuses(trip: TripCount): number {
    return this.getBusAllocation(trip).buses.length;
  }

  getAssignedStudents(trip: TripCount): number {
    const allocation = this.getBusAllocation(trip);
    return allocation.totalStudents - allocation.remainingStudents;
  }

  saveAllocations(allocations: BusAllocationDto[]): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/busallocations`, allocations, { headers })
      .pipe(
        catchError(error => {
          console.error('Save error details:', error);
          return throwError(() => new Error('Failed to save allocations'));
        })
      );
  }
}