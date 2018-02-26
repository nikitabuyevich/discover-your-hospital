import { StaffResponsivenessComponent } from './staff-responsiveness/staff-responsiveness.component';
import { CleanlinessComponent } from './cleanliness/cleanliness.component';
import { CareTransitionComponent } from './care-transition/care-transition.component';
import { DischargeInformationComponent } from './discharge-information/discharge-information.component';
import { PainManagementComponent } from './pain-management/pain-management.component';
import { RecommendedHospitalComponent } from './recommended-hospital/recommended-hospital.component';
import { DoctorCommunicationComponent } from './doctor-communication/doctor-communication.component';
import { OverallHospitalComponent } from './overall-hospital/overall-hospital.component';
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
import { NotificationsComponent } from './components/notifications/notifications.component';
import { HcahpsComponent } from './hcahps/hcahps.component';
import { HcahpsService } from './services/hcahps.service';
import { FilterByPipe } from './pipes/filter.pipe';
import { MomentModule } from 'angular2-moment';
import { OrderModule } from 'ngx-order-pipe';
import { SafePipe } from './pipes/safe.pipe';
import { NurseCommunicationComponent } from './nurse-communication/nurse-communication.component';
import { QuietnessComponent } from './quietness/quietness.component';
import { CommunicationAboutMedicineComponent } from './communication-about-medicines/communication-about-medicines.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    HcahpsComponent,
    CommunicationAboutMedicineComponent,
    OverallHospitalComponent,
    CareTransitionComponent,
    StaffResponsivenessComponent,
    CleanlinessComponent,
    QuietnessComponent,
    SummaryComponent,
    DoctorCommunicationComponent,
    RecommendedHospitalComponent,
    NotificationsComponent,
    NurseCommunicationComponent,
    DischargeInformationComponent,
    PainManagementComponent,
    Autosize,
    FilterByPipe,
    SafePipe
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
  providers: [HcahpsService, NotificationsComponent, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule {}
