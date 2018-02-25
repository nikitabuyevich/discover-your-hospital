import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Hcahps } from './../models/hcahps.model';

@Injectable()
export class HcahpsService {
  private hcahpsUrl = `${environment.hcahpsUrl}`;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http, private router: Router) {}

  getAllRatings(): Promise<Hcahps[]> {
    return this.http
      .get(this.hcahpsUrl)
      .toPromise()
      .then(this.extractData);
  }

  getOverallHospital(): Promise<Hcahps[]> {
    return this.http
      .get(this.hcahpsUrl + '/overall-hospital')
      .toPromise()
      .then(this.extractData);
  }

  getDoctorCommunication(): Promise<Hcahps[]> {
    return this.http
      .get(this.hcahpsUrl + '/doctor-communication')
      .toPromise()
      .then(this.extractData);
  }

  getRecommendedHospital(): Promise<Hcahps[]> {
    return this.http
      .get(this.hcahpsUrl + '/recommended-hospital')
      .toPromise()
      .then(this.extractData);
  }

  getSummary(): Promise<Hcahps[]> {
    return this.http
      .get(this.hcahpsUrl + '/summary')
      .toPromise()
      .then(this.extractData);
  }

  getPainManagement(): Promise<Hcahps[]> {
    return this.http
      .get(this.hcahpsUrl + '/pain-management')
      .toPromise()
      .then(this.extractData);
  }

  getDischargeInformation(): Promise<Hcahps[]> {
    return this.http
      .get(this.hcahpsUrl + '/discharge-information')
      .toPromise()
      .then(this.extractData);
  }

  getCareTransition(): Promise<Hcahps[]> {
    return this.http
      .get(this.hcahpsUrl + '/care-transition')
      .toPromise()
      .then(this.extractData);
  }

  getNurseCommunication(): Promise<Hcahps[]> {
    return this.http
      .get(this.hcahpsUrl + '/nurse-communication')
      .toPromise()
      .then(this.extractData);
  }

  getQuietness(): Promise<Hcahps[]> {
    return this.http
      .get(this.hcahpsUrl + '/quietness')
      .toPromise()
      .then(this.extractData);
  }

  getCleanliness(): Promise<Hcahps[]> {
    return this.http
      .get(this.hcahpsUrl + '/cleanliness')
      .toPromise()
      .then(this.extractData);
  }

  getStaffResponsiveness(): Promise<Hcahps[]> {
    return this.http
      .get(this.hcahpsUrl + '/staff-responsiveness')
      .toPromise()
      .then(this.extractData);
  }

  getCommunicationAboutMedicines(): Promise<Hcahps[]> {
    return this.http
      .get(this.hcahpsUrl + '/communication-about-medicines')
      .toPromise()
      .then(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
