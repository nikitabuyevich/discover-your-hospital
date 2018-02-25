import { NotificationsComponent } from './../components/notifications/notifications.component';
import { LicenseAddComponent } from './../license-add/license-add.component';
import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

import { License } from '../models/license.model';
import { LicenseService } from '../services/license.service';
import { AuthenticationService } from './../services/authentication.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-license',
  templateUrl: './licenses.component.html',
  styleUrls: [
    './licenses.component.css'
  ]
})
export class LicensesComponent implements OnInit {

  @ViewChild('statusLicenseModal') statusLicenseModal: ModalDirective;
  @ViewChild('deleteLicenseModal') deleteLicenseModal: ModalDirective;

  licenses: License[] = [];

  statusLicenseModalContent = new License();
  deleteLicenseModalContent = new License();
  order = 'status';
  search = '';

  page = 1;
  licenseStatus = 'needReview';

  reverse = false;

  constructor(
    private licenseService: LicenseService,
    private authenticationService: AuthenticationService,
    private router: Router,
    public app: AppComponent,
    private notifications: NotificationsComponent
  ) {
    this.app.showSpinner = true;
  }

  getStatusCode(): number {
    if (this.licenseStatus === 'needReview') {
      return 0;
    } else if (this.licenseStatus === 'reviewed') {
      return 1;
    }

    return 0;
  }

  getStatusString(license: License): string {
    if (license.status === 0) {
      return 'Needs Review';
    } else if (license.status === 1) {
      return 'Reviewed';
    }

    return 'Needs Review';
  }

  setOrder(value: string) {
    console.log(this.licenses);
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

  getLicenses() {
    this.licenseService
    .getLicenses()
    .then(licenses => {
      this.licenses = licenses;
      for (let license of licenses) {
        license.licenseNameAndVersion = this.licenseService.getLicenseNameAndVersion(license);
      }
      this.app.showSpinner = false;
    }).catch(err => {
      this.handleError(err);
    });
  }

  deleteLicense(license: License) {
    this.app.showSpinner = true;
    this.licenseService
      .deleteLicense(license)
      .then(() => {
        this.deleteLicenseModal.hide();
        let successText = 'Successfully removed \'' + license.licenseNameAndVersion + '\'!'
        this.notifications.displaySuccess('Deleted', successText);
        this.licenses = this.licenses.filter(x => x.licenseId !== license.licenseId);
        this.app.showSpinner = false;
      }).catch(err => {
        this.handleError(err);
      });
  }

  updateLicenseStatus(license: License) {
    license.status = this.getStatusCode();
    this.app.showSpinner = true;
    this.licenseService
      .updateLicenseStatus(license)
      .then(() => {
        this.statusLicenseModal.hide();
        let successText = 'The status of \'' + license.licenseNameAndVersion +
                           '\' is now \'' + this.getStatusString(license) + '\'!'
        this.notifications.displaySuccess('Updated', successText);
        this.app.showSpinner = false;
      }).catch(err => {
        this.handleError(err);
      });
  }

  setStatusModal(license: License) {
    this.statusLicenseModalContent = license;
    this.statusLicenseModal.show();
  }

  setDeleteModal(license: License) {
    this.deleteLicenseModalContent = license;
    this.deleteLicenseModal.show();
  }

  gotoDetail(license: License) {
    this.router.navigate(['/licenses', license.licenseId], { queryParamsHandling: 'merge' });
  }

  authenticate(func: any) {
    return this.authenticationService.getAuthentication()
    .then(user => {
      this.app.isAdmin = this.authenticationService.isAdmin(user);
      return user;
    })
    .then(func)
    .catch(err => {
      this.handleError(err);
    });
  }

  ngOnInit() {
    this.authenticate(user => {
      this.getLicenses();
    });
  }
}
