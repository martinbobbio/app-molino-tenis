import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ModalPricePage } from '../../pages/modal-price/modal-price';

@Component({
  selector: 'money',
  templateUrl: 'money.html'
})
export class MoneyPage {

  month:string;

  constructor(public modalCtrl: ModalController) {
   
  }

  openModal(){
    let modal = this.modalCtrl.create(ModalPricePage, { id: 1, title: "PEPITO", price: 1200 });
   modal.present();
  }

}
