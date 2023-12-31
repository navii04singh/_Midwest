import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-amount-details',
  templateUrl: './amount-details.component.html',
  styleUrls: ['./amount-details.component.css']
})
export class AmountDetailsComponent implements OnChanges {
  @Input() orderDetails!: any[]; // Input for orderDetails
  @Input() amountDetails!: any[]; // Define amountDetails input property

  // amountDetails: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    
  }


}
