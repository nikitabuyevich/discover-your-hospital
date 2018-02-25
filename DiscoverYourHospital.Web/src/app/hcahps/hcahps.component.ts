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

  hcahpsData: Hcahps[] = [];

  order = 'hcahpsQuestion';
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

  getAllRatings() {
    this.hcahpsService
      .getAllRatings()
      .then(allHcahps => {
        this.hcahpsData = allHcahps;
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

  getOverallHospital() {
    this.hcahpsService
      .getOverallHospital()
      .then(hcahpsData => {
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
        this.hcahpsData = hcahpsData;
        this.app.showSpinner = false;
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  getDoctorCommunication() {
    this.hcahpsService
      .getDoctorCommunication()
      .then(hcahpsData => {
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
        this.hcahpsData = hcahpsData;
        this.app.showSpinner = false;
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  getRecommendedHospital() {
    this.hcahpsService
      .getRecommendedHospital()
      .then(hcahpsData => {
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
        this.hcahpsData = hcahpsData;
        this.app.showSpinner = false;
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  getSummary() {
    this.hcahpsService
      .getSummary()
      .then(hcahpsData => {
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
        this.hcahpsData = hcahpsData;
        this.app.showSpinner = false;
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  getPainManagement() {
    this.hcahpsService
      .getPainManagement()
      .then(hcahpsData => {
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
        this.hcahpsData = hcahpsData;
        this.app.showSpinner = false;
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  getDischargeInformation() {
    this.hcahpsService
      .getDischargeInformation()
      .then(hcahpsData => {
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
        this.hcahpsData = hcahpsData;
        this.app.showSpinner = false;
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  getCareTransition() {
    this.hcahpsService
      .getCareTransition()
      .then(hcahpsData => {
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
        this.hcahpsData = hcahpsData;
        this.app.showSpinner = false;
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  getNurseCommunication() {
    this.hcahpsService
      .getNurseCommunication()
      .then(hcahpsData => {
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
        this.hcahpsData = hcahpsData;
        this.app.showSpinner = false;
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  getQuietness() {
    this.hcahpsService
      .getQuietness()
      .then(hcahpsData => {
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
        this.hcahpsData = hcahpsData;
        this.app.showSpinner = false;
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  getCleanliness() {
    this.hcahpsService
      .getCleanliness()
      .then(hcahpsData => {
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
        this.hcahpsData = hcahpsData;
        this.app.showSpinner = false;
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  getStaffResponsiveness() {
    this.hcahpsService
      .getStaffResponsiveness()
      .then(hcahpsData => {
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
        this.hcahpsData = hcahpsData;
        this.app.showSpinner = false;
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  getCommunicationAboutMedicines() {
    this.hcahpsService
      .getCommunicationAboutMedicines()
      .then(hcahpsData => {
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
        this.hcahpsData = hcahpsData;
        this.app.showSpinner = false;
      })
      .catch(err => {
        this.handleError(err);
      });
  }

  ngOnInit() {
    this.getAllRatings();
  }
}
