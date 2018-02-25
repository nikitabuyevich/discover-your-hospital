import { Injectable, } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Headers, Http, Response, RequestOptions, Request, RequestMethod } from '@angular/http';

import { Observable } from 'rxjs';

import { License } from '../models/license.model';
import { CheckedRegex } from '../models/checked-regex.model';
import { environment } from '../../environments/environment';

@Injectable()
export class LicenseService {
  private licensesUrl = `${environment.licensesUrl}`;  // URL to web api - only works with command line 'dotnet run' on API

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: Http,
    private router: Router
  ) { }

  checkLicenseRegex(license: License): CheckedRegex {
    let modifiedLicenseRegex: string;
    let modifiedLicenseText: string;

    let checkedRegex = new CheckedRegex(false, false, false);
    let matched = false;

    if (license.licenseText) {
      modifiedLicenseText = license.licenseText.replace(/\"/gi, String.raw``);
      modifiedLicenseText = modifiedLicenseText.replace(/\'/gi, String.raw``);
    } else {
      modifiedLicenseRegex = license.licenseText;
    }

    if (license.licenseRegex && license.licenseRegex.includes(String.raw`\\`)) {
      return new CheckedRegex(false, false, true); // return regex error
    }

    if (license.licenseRegex) {
      modifiedLicenseRegex = license.licenseRegex.replace(/\s+/gi, String.raw`\s*`);

      let i = 0;
      let cutOff = i + 1000;

      for (; i < modifiedLicenseRegex.length; i = cutOff, cutOff += 1000) {
        let whitespaceMatch = '';

        // loop until you find \s* to make sure to not cut off regex expression on a command
        while (!whitespaceMatch.includes(String.raw`\s*`) && (cutOff < modifiedLicenseRegex.length)) {
          whitespaceMatch += modifiedLicenseRegex[cutOff];
          cutOff += 1;
        }

        if (cutOff > modifiedLicenseRegex.length) {
          cutOff = modifiedLicenseRegex.length;
        }
        let licenseRegex = modifiedLicenseRegex.substring(i, cutOff);

        try {
          let reg = new RegExp(licenseRegex, 'gi');
          matched = reg.test(modifiedLicenseText);
        } catch (e) {
          return new CheckedRegex(false, false, true); // return regex error
        }

        if (!matched) {
          return new CheckedRegex(false, true, false); // return regex correct
        }
      }
    } else {
      modifiedLicenseRegex = license.licenseRegex;
    }

    return new CheckedRegex(true, false, false); // return regex matched
  }

  convertLicenseTextToLicenseRegex(text: string): string {
    if (!text) {
      return '';
    }

    // The \ replacement needs to happen first
    text = text.replace(/\\/gi, String.raw`\\`);

    text = text.replace(/\+/gi, String.raw`\+`);
    text = text.replace(/\-/gi, String.raw`\-`);
    text = text.replace(/\(/gi, String.raw`\(`);
    text = text.replace(/\)/gi, String.raw`\)`);
    text = text.replace(/\*/gi, String.raw`\*`);
    text = text.replace(/\&/gi, String.raw`\&`);
    text = text.replace(/\^/gi, String.raw`\^`);
    text = text.replace(/\%/gi, String.raw`\%`);
    text = text.replace(/\$/gi, String.raw`\$`);
    text = text.replace(/\#/gi, String.raw`\#`);
    text = text.replace(/\@/gi, String.raw`\@`);
    text = text.replace(/\!/gi, String.raw`\!`);
    text = text.replace(/\=/gi, String.raw`\=`);
    text = text.replace(/\_/gi, String.raw`\_`);
    text = text.replace(/\]/gi, String.raw`\]`);
    text = text.replace(/\[/gi, String.raw`\[`);
    text = text.replace(/\{/gi, String.raw`\{`);
    text = text.replace(/\}/gi, String.raw`\}`);
    text = text.replace(/\;/gi, String.raw`\;`);
    text = text.replace(/\:/gi, String.raw`\:`);
    text = text.replace(/\?/gi, String.raw`\?`);
    text = text.replace(/\//gi, String.raw`\/`);
    text = text.replace(/\./gi, String.raw`\.`);
    text = text.replace(/\,/gi, String.raw`\,`);
    text = text.replace(/\</gi, String.raw`\<`);
    text = text.replace(/\>/gi, String.raw`\>`);
    text = text.replace(/\|/gi, String.raw`\|`);

    text = text.replace(/\'/gi, '');
    text = text.replace(/\"/gi, '');

    return text;
  }

  getLicenseNameAndVersion(license: License) {
    if (license.licenseVersion) {
      return license.licenseName + ' - ' + license.licenseVersion;
    } else {
      return license.licenseName;
    }
  }

  getLicenses(): Promise<License[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.get(this.licensesUrl)
      .toPromise()
      .then(this.extractData);
  };

  getLicensesWherePackageHasLicenseId(): Promise<License[]> {
    return this.http.get(this.licensesUrl + '/packages/license')
      .toPromise()
      .then(this.extractData);
  };

  getLicense(id: number): Promise<License> {
    return this.getLicenses()
      .then(licenses => {
        let fetchedLicense = licenses.find(license => license.licenseId === id)
        if (!fetchedLicense) {
          this.router.navigate(['/licenses']);
        }
        return fetchedLicense;
      });
  }

  addLicense(license: License): Promise<Response> {
    let path = this.licensesUrl;
    return this.http.post(path, JSON.stringify(license), { headers: this.headers })
      .toPromise();
  }

  updateLicense(license: License): Promise<Response> {
    let path = this.licensesUrl;
    return this.http.put(path, JSON.stringify(license), { headers: this.headers })
      .toPromise();
  }

  updateLicenseStatus(license: License): Promise<Response> {
    let path = this.licensesUrl + '?status';
    return this.http.put(path, JSON.stringify(license), { headers: this.headers })
      .toPromise();
  }

  deleteLicense(license: License): Promise<Response> {
    let path = this.licensesUrl + '/' + license.licenseId;
    return this.http.delete(path, { headers: this.headers })
      .toPromise();
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

}
