import { Component, OnInit } from '@angular/core';
import { PaymentDetailsService } from '../shared/payment-details.service';
import { PaymentDetails } from '../shared/payment-details.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit{
constructor(public service: PaymentDetailsService, private toastr: ToastrService){

}
  ngOnInit(): void {
    this.service.refreshList();
  }
  populateForm(selectedRecord: PaymentDetails){
     this.service.formData = Object.assign({}, selectedRecord)
  }
  onDelete(id:number){
    if(confirm('Are u sure to delete the data ?')){
    this.service.deletePaymentDetails(id)
    .subscribe({
      next: response => {
        this.service.list = response as PaymentDetails[]
        this.toastr.error('Deleted successfully', 'Payment Detail Register')
      },
      error: error => {
        console.log(error)
      }
    }) 
  }
  }
}
