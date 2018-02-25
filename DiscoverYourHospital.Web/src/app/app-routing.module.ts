import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LicensesComponent } from './licenses/licenses.component';
import { LicenseDetailComponent } from './license-detail/license-detail.component';
import { LicenseAddComponent } from './license-add/license-add.component';
import { NugetPackagesComponent } from './nuget-packages/nuget-packages.component';

const routes: Routes = [
  { path: '', redirectTo: '/licenses', pathMatch: 'full' },
  { path: 'packages', component: NugetPackagesComponent },
  { path: 'licenses', component: LicensesComponent },
  { path: 'licenses/add', component: LicenseAddComponent },
  { path: 'licenses/:id', component: LicenseDetailComponent } // needs to be below the /licenses otherwise route gets overwritten
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
