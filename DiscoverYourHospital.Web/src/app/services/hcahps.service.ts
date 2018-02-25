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

  getAllHcahps(): Promise<Hcahps[]> {
    return this.http
      .get(this.hcahpsUrl)
      .toPromise()
      .then(this.extractData);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
