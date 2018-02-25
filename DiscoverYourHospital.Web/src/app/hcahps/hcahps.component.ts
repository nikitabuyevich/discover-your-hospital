import { NotificationsComponent } from './../components/notifications/notifications.component';
import { LicenseAddComponent } from './../license-add/license-add.component';
import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

import { AppComponent } from '../app.component';
import { Hcahps } from './../models/hcahps.model';
import { HcahpsService } from './../services/hcahps.service';

@Component({
  selector: 'app-hcahps',
  templateUrl: './hcahps.component.html',
  styleUrls: ['./hcahps.component.css']
})
export class HcahpsComponent implements OnInit {
  @ViewChild('statusLicenseModal') statusLicenseModal: ModalDirective;
  @ViewChild('deleteLicenseModal') deleteLicenseModal: ModalDirective;

  allHcahps: Hcahps[] = [];

  order = 'patientSurveyId';
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
    console.log(this.allHcahps);
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

  getAllHcahps() {
    this.hcahpsService
      .getAllHcahps()
      .then(allHcahps => {
        this.allHcahps = allHcahps;
        this.app.showSpinner = false;
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  ngOnInit() {
    this.getAllHcahps();
  }
}
