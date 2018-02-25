import { NotificationsComponent } from './../components/notifications/notifications.component';
import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

import { AppComponent } from '../app.component';
import { Hcahps } from './../models/hcahps.model';
import { HcahpsService } from './../services/hcahps.service';

@Component({
  selector: 'app-nurse-communication',
  templateUrl: './nurse-communication.component.html'
})
export class NurseCommunicationComponent implements OnInit {
  hcahpsData: Hcahps[] = [];

  order = 'hospitalName';
  search = '';

  page = 1;

  reverse = false;

  constructor(
    private hcahpsService: HcahpsService,
    private router: Router,
    public app: AppComponent,
    private notifications: NotificationsComponent
  ) {
    this.app.showSpinner = true;
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  handleError(err) {
    if (!err.url) {
      this.notifications.displayConnectionError();
    } else {
      this.notifications.displayError('Error occurred', err._body, false);
    }

    this.app.showSpinner = false;
  }

  getNurseCommunication() {
    this.hcahpsService
      .getNurseCommunication()
      .then(hcahpsData => {
        this.hcahpsData = hcahpsData;
        for (let hcahps of this.hcahpsData) {
          hcahps.search =
            hcahps.address +
            hcahps.city +
            hcahps.countyName +
            hcahps.hospitalName +
            hcahps.patientSurveyStarRating +
            hcahps.phoneNumber +
            hcahps.state +
            hcahps.surveyResponseRatePercent +
            hcahps.zipCode;
        }
        this.app.showSpinner = false;
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  ngOnInit() {
    this.getNurseCommunication();
  }
}
