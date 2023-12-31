import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaypalService } from '../paypal.service'; // Import your PaypalService

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  // Define PayerID property
  PayerID = '';
  transactionID = "";

  constructor(
    private route: ActivatedRoute,
    private paypalService: PaypalService // Inject PaypalService
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.PayerID = this.paypalService.PayerID;
      this.transactionID = this.paypalService.transactionID;
      // console.log('Payer ID:', this.PayerID);
      // console.log('Transaction ID:', this.transactionID);
    });
  }
  
  
  
  
}
