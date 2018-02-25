import { CommunicationAboutMedicineComponent } from './communication-about-medicines/communication-about-medicines.component';
import { StaffResponsivenessComponent } from './staff-responsiveness/staff-responsiveness.component';
import { CleanlinessComponent } from './cleanliness/cleanliness.component';
import { NurseCommunicationComponent } from './nurse-communication/nurse-communication.component';
import { CareTransitionComponent } from './care-transition/care-transition.component';
import { DischargeInformationComponent } from './discharge-information/discharge-information.component';
import { PainManagementComponent } from './pain-management/pain-management.component';
import { RecommendedHospitalComponent } from './recommended-hospital/recommended-hospital.component';
import { DoctorCommunicationComponent } from './doctor-communication/doctor-communication.component';
import { OverallHospitalComponent } from './overall-hospital/overall-hospital.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HcahpsComponent } from './hcahps/hcahps.component';
import { QuietnessComponent } from './quietness/quietness.component';

const routes: Routes = [
  { path: '', redirectTo: '/hcahps', pathMatch: 'full' },
  { path: 'hcahps', component: HcahpsComponent },
  { path: 'overall-hospital', component: OverallHospitalComponent },
  { path: 'recommended-hospital', component: RecommendedHospitalComponent },
  { path: 'summary', component: RecommendedHospitalComponent },
  { path: 'pain-management', component: PainManagementComponent },
  { path: 'care-transition', component: CareTransitionComponent },
  { path: 'nurse-communication', component: NurseCommunicationComponent },
  { path: 'quietness', component: QuietnessComponent },
  { path: 'staff-responsiveness', component: StaffResponsivenessComponent },
  { path: 'cleanliness', component: CleanlinessComponent },
  { path: 'communication-about-medicine', component: CommunicationAboutMedicineComponent },
  { path: 'discharge-information', component: DischargeInformationComponent },
  { path: 'doctor-communication', component: DoctorCommunicationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
