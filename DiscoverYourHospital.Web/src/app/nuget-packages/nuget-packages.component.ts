import { AuthenticationService } from './../services/authentication.service';
import { PackageService } from '../services/package.service';
import { LicenseAddComponent } from './../license-add/license-add.component';
import { NotificationsComponent } from './../components/notifications/notifications.component';
import { Component, OnInit, NgModule, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { SelectComponent } from 'ng2-select-compat';

import { NugetPackage } from '../models/nuget-package.model';
import { License } from '../models/license.model';
import { LicenseService } from '../services/license.service';
import { AppComponent } from './../app.component';

@Component({
  selector: 'app-nuget-packages',
  templateUrl: './nuget-packages.component.html',
  styleUrls: [
    '../licenses/licenses.component.css', './ng2-select.css', './nuget-package.component.css'
  ]
})
export class NugetPackagesComponent implements OnInit, OnDestroy {

  @ViewChild('licenseselector') ngSelect: SelectComponent;
  @ViewChild('packageModal') packageModal: ModalDirective;

  packages: NugetPackage[] = [];
  licenses: License[] = [];
  licenseNameAndVersions: Array<string> = [];
  modalPackage = new NugetPackage();

  order = 'packageNameAndVersion';
  search = '';

  page = 1;

  displayUrls = false;
  reverse = false;
  licenseMinderRunning = false;

  gottenLicenses = false;
  gottenPackages = false;

  // Used as the interval
  autoCheckStatus: any;

  // auto update interval in seconds
  updateInterval = 30;

  constructor(
    private packageService: PackageService,
    private licenseService: LicenseService,
    private router: Router,
    public app: AppComponent,
    private notifications: NotificationsComponent,
    private authenticationService: AuthenticationService
  ) {
    this.app.showSpinner = true;
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }

    this.order = value;
  }

  getLicenseFromLicenseNameAndVersion(licenseNameAndVersion): License {
    return this.licenses.find(license => license.licenseNameAndVersion === licenseNameAndVersion);
  }

  getPackageFromPackageNameAndVersion(packageNameAndVersion): NugetPackage {
    return this.packages.find(nugetPackage => nugetPackage.packageNameAndVersion === packageNameAndVersion);
  }

  sortLicenseNamesAlphabetically(licenseNames: string[]): string[] {
    return licenseNames.sort((n1, n2) => {
      if (n1 > n2) {
        return 1;
      }

      if (n1 < n2) {
        return -1;
      }

      return 0;
    });
  }

  setModal(nugetPackage: NugetPackage) {
    this.modalPackage.packageName = nugetPackage.packageName;
    this.modalPackage.packageVersion = nugetPackage.packageVersion;
    this.modalPackage.nugetUrl = nugetPackage.nugetUrl;
    this.modalPackage.licenseUrl = nugetPackage.licenseUrl;

    // if no urls dont display url block
    this.displayUrls = this.modalPackage.nugetUrl || this.modalPackage.licenseUrl ? true : false;

    // clear dropdown selection
    this.ngSelect.active = [];
    this.packageModal.show();
  }

  getPackages() {
    this.packageService
      .getPackages()
      .then(packages => {
        this.packages = packages;
        for (let nugetPackage of packages) {
          nugetPackage.packageNameAndVersion = this.packageService.getProperPackageInfo(nugetPackage);
        }
        this.gottenPackages = true;
        if (this.gottenLicenses) {
          this.app.showSpinner = false;
        }
      }).catch(err => {
        this.handleError(err);
      });
  }

  connectPackageToLicense() {
    // If nothing is selected in the dropdown
    if (!this.ngSelect.activeOption) {
      this.notifications.displayError('Empty Field', 'Please select a License that matches the package', true);
      return;
    }

    // Get LicenseId
    let selectedLicenseNameAndVersion = this.ngSelect.activeOption.text;
    let license = this.getLicenseFromLicenseNameAndVersion(selectedLicenseNameAndVersion);
    this.modalPackage.licenseId = license.licenseId;

    // Get Package to be removed after connecting package to license
    let packageNameAndVersion = this.packageService.getProperPackageInfo(this.modalPackage);
    let packageToBeRemoved = this.getPackageFromPackageNameAndVersion(packageNameAndVersion);

    this.app.showSpinner = true;
    this.packageService.updatePackage(this.modalPackage).then(() => {
    this.packageModal.hide();
    let successText = packageNameAndVersion + ' is now associated with ' + license.licenseNameAndVersion;
    this.notifications.displaySuccess('Connected', successText);
    // remove package from packages list
    this.packages = this.packages.filter(nugetPackage => nugetPackage !== packageToBeRemoved);
    this.app.showSpinner = false;
    }).catch(err => {
      this.handleError(err);
    });
  }

  getLicenses() {
    this.licenseService
      .getLicenses()
      .then(licenses => {
        this.licenses = licenses;
        let items: Array<string> = [];
        for (let license of licenses) {
          license.licenseNameAndVersion = this.licenseService.getLicenseNameAndVersion(license);
          items.push(license.licenseNameAndVersion);
        }
        items = this.sortLicenseNamesAlphabetically(items);
        this.licenseNameAndVersions = items;
        this.gottenLicenses = true;
        if (this.gottenPackages) {
          this.app.showSpinner = false;
        }
      }).catch(err => {
        this.handleError(err);
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
      if (!this.authenticationService.isAdmin(user)) {
        this.router.navigate(['/licenses'], { queryParamsHandling: 'merge' });
      }
      return user;
    })
    .then(func)
    .catch(err => {
      this.router.navigate(['/licenses'], { queryParamsHandling: 'merge' });
    });
  }

  ngOnInit() {
    this.authenticate(user => {
      this.getPackages();
      this.getLicenses();
    });
  }

  ngOnDestroy() {
    clearInterval(this.autoCheckStatus);
  }
}
