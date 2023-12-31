import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaypalService {
  PayerID: string = '';
  transactionID = "";
  errorMessage: string = '';


  constructor(private http: HttpClient) {}

   async saveLicenseDetails(licenseDetails: any){
    const url = `midwestapicall/api/licenses/save-license-details`;

    try {
      const response = await this.http.post(url, licenseDetails).pipe().toPromise();
      return response;
    } catch (error) {
      // Handle and log the error
      console.error('Error saving license details:', error);
      const errorMessage = 'An error occurred while saving license details. Please try again later.';
      this.errorMessage = errorMessage;
      throw error; // Rethrow the error so it can be caught in your component
    }
  }
  
  
  
}
