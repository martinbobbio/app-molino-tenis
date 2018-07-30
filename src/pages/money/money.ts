import { Component } from '@angular/core';
import { MoneyService } from '../../providers/money/money.service'
import { ModalSpendPage } from '../../pages/modal-spend/modal-spend';
import { ModalController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'money',
  templateUrl: 'money.html'
})
export class MoneyPage {

  month:string = "07"
  monthString:string = ""
  monthAmount:number = 0

  constructor(public moneyService:MoneyService, public modalCtrl:ModalController,public loadingCtrl: LoadingController) {
    this.getSpendByMonth(this.month)
  }

  changeMonth(event){
    this.getSpendByMonth(event)
  }

  getSpendByMonth(month){
    let loading = this.loadingCtrl.create({
      content: 'Cargando dinero mensual...'
    });
    loading.present();
    this.moneyService.getSpendByMonth(month).subscribe(
      (response)=>{
        this.monthAmount = response.data[0]["total"]
        loading.dismiss();
      })
  }

  newSpend(){
    let modal = this.modalCtrl.create(ModalSpendPage,{method:"add",title:"Nueva Recaudación"});
    modal.present();
    modal.onDidDismiss(data => {
      this.getSpendByMonth(this.month)
   });
  }
  viewSpend(){
    this.getMonthString()
    let modal = this.modalCtrl.create(ModalSpendPage,{method:"view",title:"Dinero de "+this.monthString,month:this.month});
    modal.present();
    modal.onDidDismiss(data => {
      this.getSpendByMonth(this.month)
   });
  }

  getMonthString(){
    if(this.month == "07")
      this.monthString = "Julio"
    else if(this.month == "08")
      this.monthString = "Agosto"
    else if(this.month == "09")
      this.monthString = "Septiembre"
    else if(this.month == "10")
      this.monthString = "Octubre"
    else if(this.month == "11")
      this.monthString = "Noviembre"
    else if(this.month == "12")
      this.monthString = "Diciembre"
    
  }

}
