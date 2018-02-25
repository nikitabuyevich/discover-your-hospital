// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { BsDropdownModule, TabsModule, ButtonsModule, TooltipModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { JWBootstrapSwitchModule } from 'jw-bootstrap-switch-ng2';
import { Autosize } from 'angular2-autosize/angular2-autosize';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { GoTopButtonModule } from 'ng2-go-top-button';
import { SpinnerComponentModule } from 'ng2-component-spinner';
import { SelectModule } from 'ng2-select-compat';
import { CookieService } from 'ng2-cookies';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { LicensesComponent } from './licenses/licenses.component';
import { NugetPackagesComponent } from './nuget-packages/nuget-packages.component';
import { LicenseDetailComponent } from './license-detail/license-detail.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { LicenseAddComponent } from './license-add/license-add.component';
import { LicenseService } from './services/license.service';
import { PackageService } from './services/package.service';
import { AuthenticationService } from './services/authentication.service';
import { FilterByPipe } from './pipes/filter.pipe';
import { MomentModule } from 'angular2-moment';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
  declarations: [
    AppComponent,
    LicensesComponent,
    NugetPackagesComponent,
    LicenseDetailComponent,
    LicenseAddComponent,
    NotificationsComponent,
    Autosize,
    FilterByPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    JWBootstrapSwitchModule,
    MomentModule,
    SelectModule,
    OrderModule,
    SpinnerComponentModule,
    BrowserAnimationsModule,
    GoTopButtonModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot(),
    BsDropdownModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    CommonModule
  ],
  providers: [LicenseService, PackageService, AuthenticationService, NotificationsComponent, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
