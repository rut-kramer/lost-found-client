import { Injectable } from '@angular/core';
import { Agency } from '../zClasses/Agency';
import { Route } from '../zClasses/Route';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TransportationService {
  public data = {
    Agencies: new BehaviorSubject<Agency[]>([]),
    BusRoutes: new BehaviorSubject<Route[]>([]),
  }
  Agencies: Agency[] = [];
  BusRoutes: Route[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.GetRoutes();
    this.GetAgency();
  }

  GetRoutes() {
    console.log("Get GetRoutes");
    this.http.get('/api/Data/GetRoutes').subscribe(x => {
      this.BusRoutes.push(...(x as Route[]));
      this.data.BusRoutes.next(this.BusRoutes);
    });
  }

  GetAgency() {
    console.log("Get GetAgency");
    this.http.get('/api/Data/GetAgency').subscribe(x => {
      this.Agencies.push(...(x as Agency[]));
      this.data.Agencies.next(this.Agencies);
    });

  }
}
