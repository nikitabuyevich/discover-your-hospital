import { NotificationsComponent } from './../components/notifications/notifications.component';
import { Injectable, AnimationKeyframesSequenceMetadata, } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Headers, Http, Response, RequestOptions, Request, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs';

import { User } from './../models/user.model';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  private AuthenticationUrl = `${environment.authenticationUrl}`;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  userPromise: Promise<User> = null;

  constructor(
    private http: Http,
    private router: Router
  ) { }

  isAdmin(user: User): boolean {
    return user.role === 'admin';
  }

  getAuthentication(): Promise<User> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    if (this.userPromise === null) {
      this.userPromise = this.http.get(this.AuthenticationUrl)
      .toPromise()
      .then(this.extractData);
    }

    return this.userPromise;
  };

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
}
