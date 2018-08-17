import { Component } from '@angular/core';
import { NavParams, ToastController, ViewController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { FinanceService } from '../../providers/finance/finance.service'


@Component({
  selector: 'page-modal-finance',
  templateUrl: 'modal-finance.html'
})
export class ModalFinancePage {

  form:FormGroup;

  constructor(public params: NavParams,public viewCtrl:ViewController, public financeService:FinanceService, public toastCtrl:ToastController) {

    this.form = new FormGroup({
      'title': new FormControl(),
      'count': new FormControl(),
      'total': new FormControl(),
    })

  }

  submitForm(){
    if(this.form.get("title").value != "" && this.form.get("count").value != "" && this.form.get("total").value != ""){

      let data = {
        title: this.form.get("title").value,
        count: this.form.get("count").value,
        total: this.form.get("total").value,
      }
      this.financeService.createFinance(data).subscribe(
        (response)=>{
          let toast = this.toastCtrl.create({
            message: 'Has agregado un nuevo abono',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          this.viewCtrl.dismiss();
        })

      

    }

  }

}
