import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-order-details-table',
  templateUrl: './order-details-table.component.html',
  styleUrls: ['./order-details-table.component.css'],
})
export class OrderDetailsTableComponent {
  @Input() orderDetails!: any[]; // Add the definite assignment assertion (!) to indicate that the property will be initialized from the parent component
  @Input() amountDetails!: any[]; // Add the definite assignment assertion (!) to indicate that the property will be initialized from the parent component

}
