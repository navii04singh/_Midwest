// shared.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  orderDetails: any[] = [];
  amountDetails: any[] = [];

  units: number = 0;

}
