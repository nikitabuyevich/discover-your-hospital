import { AuthenticationService } from './../services/authentication.service';
import { NotificationsComponent } from './../components/notifications/notifications.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { LicenseService } from '../services/license.service';
import { License } from '../models/license.model';
import { AppComponent } from '../app.component';
import { CheckedRegex } from '../models/checked-regex.model';
import { LicenseAddComponent } from '../license-add/license-add.component';
import { CookieService } from 'ng2-cookies';

@Component({
  selector: 'app-license-detail',
  templateUrl: './license-detail.component.html',
  styleUrls: ['./license-detail.component.css']
})

export class LicenseDetailComponent implements OnInit {

  @ViewChild('licenseTextArea') licenseTextArea;
  @ViewChild('regexTextArea') regexTextArea;

  @Input()
  license: License;

  initialLicenseNameAndVersion = '';
  checkedRegex = new CheckedRegex(true, false, false);
  textareaRowHeight: number;

  licenseTextLocked = true;
  showRegexCheatSheet = true;

  constructor(
    private licenseService: LicenseService,
    private route: ActivatedRoute,
    private router: Router,
    private app: AppComponent,
    private notifications: NotificationsComponent,
    private cookie: CookieService,
    private authenticationService: AuthenticationService
  ) {
    this.app.showSpinner = true;
    let showRegexCheatSheetCookie = this.cookie.get('showRegexCheatSheetCookie');
    if (showRegexCheatSheetCookie === null) {
      this.cookie.set('showRegexCheatSheetCookie', String(this.showRegexCheatSheet), 9999 /*days from now*/);
    }
    this.showRegexCheatSheet = showRegexCheatSheetCookie === 'true' || showRegexCheatSheetCookie === '';
  }

  // Fixes autosize textarea bug
  increaseRowHeight() {
    let licenseTextAreaHeight = this.licenseTextArea.nativeElement.clientHeight;
    let regexTextAreaHeight = this.regexTextArea.nativeElement.clientHeight;
    let amountToIncreaseHeight = licenseTextAreaHeight > regexTextAreaHeight ? licenseTextAreaHeight : regexTextAreaHeight;
    let initialDifferenceBetweenRowHeightAndTextareaHeight = 102;
    this.textareaRowHeight = initialDifferenceBetweenRowHeightAndTextareaHeight + amountToIncreaseHeight;
  }

  validateLicenseName() {
    if (!this.license.licenseName) {
      this.notifications.displayError('Empty Field', 'Please provide a Licese Name', true);
    }
  }

  validateLicenseRegex() {
    this.checkedRegex = this.licenseService.checkLicenseRegex(this.license);
  }

  toggleTextReadOnly() {
    this.licenseTextLocked = !this.licenseTextLocked;
  }

  toggleRegexCheatSheet() {
    this.showRegexCheatSheet = !this.showRegexCheatSheet;
    this.cookie.set('showRegexCheatSheetCookie', String(this.showRegexCheatSheet), 9999 /*days from now*/);
  }

  editingLicenseText() {
    this.license.licenseRegex = this.licenseService.convertLicenseTextToLicenseRegex(this.license.licenseText);
    this.licenseService.checkLicenseRegex(this.license);
    this.increaseRowHeight();
  }

  disableLicenseText() {
    this.licenseTextLocked = true;
    this.validateLicenseRegex();
  }

  updateLicense() {
    let licenseRegexMatches = this.licenseService.checkLicenseRegex(this.license);
    let valid = true;

    if (licenseRegexMatches.regexError) {
      this.notifications.displayRegexError();
      valid = false;
    }

    if (!this.license.licenseName) {
      this.notifications.displayError('Empty Field', 'Please provide a Licese Name', true);
      valid = false;
    }

    if (valid) {
      this.app.showSpinner = true;
      this.license.licenseNameAndVersion = this.licenseService.getLicenseNameAndVersion(this.license);
      this.licenseService.updateLicense(this.license).then(() => {
        this.app.showSpinner = false;
        this.router.navigate(['/licenses'], { queryParamsHandling: 'merge' });
        let successText = 'Successfully updated license: ' + this.license.licenseNameAndVersion;
        this.notifications.displaySuccess('Success', successText);
      }).catch(err => {
        this.handleError(err);
      });
    }
  }

  cancel() {
    this.router.navigate(['/licenses'], { queryParamsHandling: 'merge' });
  }

  getLicenseId() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.licenseService.getLicense(id)
        .then(license => {
          this.license = license;
          this.initialLicenseNameAndVersion = this.licenseService.getLicenseNameAndVersion(license);
          // fixes auto scaling textarea glitch
          let loadInterval = setInterval(() => {
            this.increaseRowHeight();
            clearInterval(loadInterval);
          }, 500);
          this.app.showSpinner = false;
        }).catch(err => {
          this.handleError(err);
        });
    });
  }

  handleError(err) {
    if (!err.url) {
      this.notifications.displayConnectionError();
    } else {
      this.notifications.displayError('Error occurred', err._body, false);
    }
    this.app.showSpinner = false;
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
      this.getLicenseId();
    })
  }
}
