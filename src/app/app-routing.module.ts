import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LicensePurchaseComponent } from './license-purchase/license-purchase.component';
// import { LicenseRenewalComponent } from './license-renewal/license-renewal.component';
import { ContactComponent } from './contact/contact.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentCanceledComponent } from './payment-canceled/payment-canceled.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'license-purchase', component: LicensePurchaseComponent },
  // { path: 'license-renewal', component: LicenseRenewalComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'customer-details', component: CustomerDetailsComponent },
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-canceled', component: PaymentCanceledComponent }

  // Add more routes for other components as needed
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
