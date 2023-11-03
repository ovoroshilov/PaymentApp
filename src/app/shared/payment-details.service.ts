import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { PaymentDetails } from './payment-details.module';
import { NgForm } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class PaymentDetailsService {

  formData: PaymentDetails = new PaymentDetails();
  list: PaymentDetails[] = [];
  url: string = environment.apiBaseUrl + '/PaymentDetail'; 
  formSubmitted: boolean = false;
  constructor(private http: HttpClient) { }

  refreshList(){
    this.http.get(this.url)
    .subscribe({
      next: response =>{
        this.list = response as PaymentDetails[]
      },
      error: error =>{console.log(error)}
    })
  }
  postPaymentDetails(){
    return this.http.post(this.url, this.formData)
  }
  putPaymentDetails(){
    return this.http.put(this.url + '/' + this.formData.paymentDetailId, this.formData)
  }
  deletePaymentDetails(id: number){
    return this.http.delete(this.url + '/' + id)
  }
  resetForm(form: NgForm){
   form.form.reset()
   this.formData = new PaymentDetails()
   this.formSubmitted = false;
  }
}
