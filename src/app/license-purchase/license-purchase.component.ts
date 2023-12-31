import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared.service';


import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-license-purchase',
  templateUrl: './license-purchase.component.html',
  styleUrls: ['./license-purchase.component.css']
})
export class LicensePurchaseComponent {
  units: number = 0;
  perPcAmount: number = 750;
  totalAmount: number = 0; // Declare the totalAmount property and initialize it to 0
  orderDetails: any[] = []; // Initialize the orderDetails array to store the order details data
  amountDetails: any[] = [];
  // taxPercentage: number = 0.1;
  fileUrl!: SafeResourceUrl ;

  constructor(private router: Router, private route: ActivatedRoute, private sharedService: SharedService, private http: HttpClient, private sanitizer: DomSanitizer) {

    this.populateOrderDetails();
    this.populateamountDetails();
  }

  ngOnInit() {
    // const data = 'some text';
    // const blob = new Blob([data], {
    //   type: 'application/msaccess'
    // });
    const filePath = 'assets/access/Midwest.accdb';

    // this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(filePath);

  }
  
  // Function to calculate the perPcAmount based on the number of units
  calculatePerPcAmount() {
    if (this.units === 1) {
      this.perPcAmount = 750;
    } else if (this.units >= 2 && this.units <= 3) {
      this.perPcAmount = 700;
    } else if (this.units >= 4) {
      this.perPcAmount = 600;
    } else {
      this.perPcAmount = 0;
    }
  }

  increaseUnits() {
    this.units++;
    this.calculatePerPcAmount();
    this.calculateTotalAmount();
    this.populateOrderDetails();
    this.populateamountDetails();
    // this.populateAmountDetails(); // Add this line
  }
  
  decreaseUnits() {
    if (this.units > 0) {
      this.units--;
      this.calculatePerPcAmount();
      this.calculateTotalAmount();
      this.populateOrderDetails();
      this.populateamountDetails();

      // this.populateAmountDetails(); // Add this line
    }
  }
  

  // Function to calculate the total amount based on the number of units, perPcAmount, and tax
TotalAmount() {
  const subTotal = this.units * this.perPcAmount;
  // const taxAmount = this.getTaxAmount();
  this.totalAmount = subTotal;
}


  // Function to calculate the total amount based on the number of units and perPcAmount
  calculateTotalAmount() {
    this.totalAmount = this.units * this.perPcAmount;
  }

  // Function to calculate the tax amount based on the total amount and taxPercentage
  // getTaxAmount() {
  //   return this.totalAmount * this.taxPercentage;
  // }

  // Function to populate the orderDetails array with necessary data
  populateOrderDetails() {
    this.orderDetails = []; // Clear the existing data before populating
    if (this.units > 0) {
      this.orderDetails.push({
        version: 'Standard',
        productName: 'New License for PCs',
        count: this.units,
        price: this.perPcAmount
      });
    }else {
      this.orderDetails = []; // Clear the array if units are zero
    }
  }

  populateamountDetails() {
    this.amountDetails = []; // Clear the existing data before populating
    if (this.units > 0) {
      this.amountDetails.push({
        TotalPCsamount: this.totalAmount,
        // Tax: this.getTaxAmount(),
        Totalamountwithtax: this.totalAmount,
      });
    }else {
      this.amountDetails = []; // Clear the array if units are zero
    }
  }
  
  
  proceedToCheckout() {  
    // Now, proceed with the navigation
    this.sharedService.orderDetails = this.orderDetails;
    this.sharedService.amountDetails = this.amountDetails;
    this.sharedService.units = this.units;

    this.router.navigate(['../customer-details'], {
      relativeTo: this.route,
      state: { orderDetails: this.orderDetails, amountDetails: this.amountDetails }
    });
  }
  

}
