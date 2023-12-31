import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PaypalService } from './paypal.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LicensePurchaseComponent } from './license-purchase/license-purchase.component';
// import { LicenseRenewalComponent } from './license-renewal/license-renewal.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { OrderDetailsTableComponent } from './order-details-table/order-details-table.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { PaymentCanceledComponent } from './payment-canceled/payment-canceled.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LicensePurchaseComponent,
    // LicenseRenewalComponent,
    ContactComponent,
    HeaderComponent,
    OrderDetailsTableComponent,
    CustomerDetailsComponent,
    PaymentSuccessComponent,
    PaymentCanceledComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [PaypalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
