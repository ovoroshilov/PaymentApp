import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentDetails } from 'src/app/shared/payment-details.module';
import { PaymentDetailsService } from 'src/app/shared/payment-details.service';

@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styleUrls: ['./payment-details-form.component.css']
})
export class PaymentDetailsFormComponent {
  constructor(public service: PaymentDetailsService, private toastr: ToastrService){

  }

  onSubmit(form: NgForm){
    this.service.formSubmitted
    if(form.valid){
      if(this.service.formData.paymentDetailId == 0) this.insertRecord(form)
      else this.updateRecord(form)
    }
  }
  insertRecord(form:NgForm){    
    this.service.postPaymentDetails()
    .subscribe({
      next: (response: any) => {
        this.service.list = response as PaymentDetails[]
        this.service.resetForm(form)
        this.toastr.success('Inserted successfully', 'Payment Detail Register')
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }
  updateRecord(form:NgForm){   
    this.service.putPaymentDetails()
    .subscribe({
      next: (response: any) => {
        this.service.list = response as PaymentDetails[]
        this.service.resetForm(form)
        this.toastr.info('Updated successfully', 'Payment Detail Register')
      },
      error: (error: any) => {
        console.log(error)
      }
    }) 
  }
 
}
