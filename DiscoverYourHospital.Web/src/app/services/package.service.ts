import { Injectable, } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Headers, Http, Response } from '@angular/http';

import { Observable } from 'rxjs';

import { License } from '../models/license.model';
import { NugetPackage } from '../models/nuget-package.model';
import { environment } from '../../environments/environment';

@Injectable()
export class PackageService {
  private packagesUrl = `${environment.packagesUrl}`;

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: Http,
    private router: Router
  ) { }

  getProperPackageInfo(nugetPackage: NugetPackage) {
    nugetPackage.nugetUrlDoesNotExist = nugetPackage.nugetUrl === null;
    nugetPackage.licenseUrlDoesNotExist = nugetPackage.licenseUrl === null;
    if (nugetPackage.packageVersion) {
      return nugetPackage.packageName + ' - ' + nugetPackage.packageVersion;
    } else {
      return nugetPackage.packageName;
    }
  }

  getPackages(): Promise<NugetPackage[]> {
    return this.http.get(this.packagesUrl)
      .toPromise()
      .then(this.extractData);
  };

  updatePackage(nugetPackage: NugetPackage): Promise<Response> {
    let path = this.packagesUrl + '/package';
    return this.http.put(path, JSON.stringify(nugetPackage), { headers: this.headers })
      .toPromise();
  }

  private extractData(res: Response) {
    let body = res.json();
    return body;
  }

}
