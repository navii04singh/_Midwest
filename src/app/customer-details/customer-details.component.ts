import {
  Component,
  ElementRef,
  Input,
  AfterViewInit,
  OnInit,
  ViewChild,
  NgZone,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { PaypalService } from '../paypal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { amountData } from '../amount-details.interface';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit, AfterViewInit {
  customerDetailsForm: FormGroup;
  customer: any = {
    country: '---Select Country---',
    email: '',
    Name: '',
    city: '',
    Address: '',
    contact: '',
    Zip: '',
  };
  formChanged: boolean = false; // Add this flag
  units: number = 0;
  totalAmountWithTax: number = 0;
  showPayPalButton: boolean = false;
  loading: boolean = false;
  paypalButtonRendered: boolean = false;
  @ViewChild('paymentRef', { static: false }) paymentRef!: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private paypalService: PaypalService,
    private http: HttpClient,
    private ngZone: NgZone
  ) {
    this.customerDetailsForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      Name: ['', Validators.required],
      country: ['---Select Country---', Validators.required],
      city: ['', Validators.required],
      contact: ['', Validators.required],
      Zip: ['', Validators.required],
      Address: ['', Validators.required],
    });
  }
  @Input() orderDetails!: any[];
  @Input() amountDetails!: any[];
  ngOnInit() {
    this.onFormValueChanges();
    this.route.paramMap.subscribe((params) => {
      if (window.history.state.orderDetails) {
        this.orderDetails = window.history.state.orderDetails;
      }
      if (window.history.state.amountDetails) {
        this.amountDetails = window.history.state.amountDetails;
        this.totalAmountWithTax = this.getTotalAmountWithTax(
          this.amountDetails
        );
      }
    });
    this.orderDetails = this.sharedService.orderDetails;
    this.amountDetails = this.sharedService.amountDetails;
    this.units = this.sharedService.units;
    this.customerDetailsForm.patchValue(this.customer);
  }
  isFormValid() {
    return this.customerDetailsForm.valid;
  }
  continueWithPayment() {
    console.log('Form Details:', this.customerDetailsForm.value);

    if (this.customerDetailsForm.valid) {
      console.log('Form is valid');
      if (!this.paypalButtonRendered) {
        this.showPayPalButton = true;
        this.renderPayPalButton();
        this.paypalButtonRendered = true;
      }
    } else {
      console.log('Form is invalid');
    }
  }

  onFormValueChanges() {
    this.customerDetailsForm.valueChanges.subscribe(() => {
      this.formChanged = true; // Set the flag to true when form values change
      this.showPayPalButton = false; // Hide the PayPal button
    });
  }
  ngAfterViewInit() {
    // This is called after the view is initialized, and `paymentRef` should be available here
    this.renderPayPalButton();
  }
  renderPayPalButton() {
    setTimeout(() => {
      console.log('Rendering PayPal button');
      console.log(window.paypal);
      window.paypal
        .Buttons({
          style: {},
          createOrder: (data: any, actions: any) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: this.totalAmountWithTax,
                    currency_code: 'USD',
                  },
                },
              ],
            });
          },
          onApprove: async (data: any, actions: any) => {
            this.loading = true; // Display the loading spinner
            try {
              const details: any = await actions.order.capture();
              if (details.status === 'COMPLETED') {
                const payerId = details.payer.payer_id;
                const transactionId = details.id;
                this.paypalService.PayerID = payerId;
                this.paypalService.transactionID = transactionId; // Store the transaction ID
          
                const licenseDetails = {
                  ClientName: this.customerDetailsForm.value.Name,
                  Address: this.customerDetailsForm.value.Address,
                  City: this.customerDetailsForm.value.city,
                  Country: this.customerDetailsForm.value.country,
                  ZipCode: this.customerDetailsForm.value.Zip,
                  EmailID: this.customerDetailsForm.value.email,
                  ContactNo: this.customerDetailsForm.value.contact,
                  Amount: this.totalAmountWithTax,
                  NoOfMachines: this.units,
                  TransactionID: transactionId,
                };
          
                console.log('License Details:', licenseDetails);
          
                // Now you can use await with saveLicenseDetails
                let res= await this.paypalService.saveLicenseDetails(licenseDetails);
                console.log('res',res)
                // Redirect to success page after successful saveLicenseDetails
                this.router.navigate(['payment-success']);
              }
            } catch (error) {
              // Handle specific errors and provide appropriate feedback to the user
              console.error('Error occurred during payment capture:', error);
              this.router.navigate(['payment-canceled']);
            } finally {
              this.loading = false; // Hide the loading spinner regardless of success or failure
            }
          }
          ,

          onError: (error: any) => {
            console.log(error);
          },
        })
        .render(this.paymentRef.nativeElement);
    }, 1000); // Adjust the delay time if needed
  }
  goBack() {
    this.router.navigate(['/license-purchase']);
  }
  private getTotalAmountWithTax(amountDetails: amountData[]): number {
    let totalAmountWithTax = 0;
    for (const detail of amountDetails) {
      totalAmountWithTax += detail.Totalamountwithtax;
    }
    return totalAmountWithTax;
  }
}
