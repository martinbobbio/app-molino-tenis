import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ModalPricePage } from '../../pages/modal-price/modal-price';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'money',
  templateUrl: 'money.html'
})
export class MoneyPage {

  month:string;

  constructor(public modalCtrl: ModalController,private alertCtrl: AlertController) {
   
  }

  openModal(){
    let modal = this.modalCtrl.create(ModalPricePage, { id: 1, title: "PEPITO", price: 1200, method: "edit" });
   modal.present();
  }

  deletePrice() {
    let alert = this.alertCtrl.create({
      title: 'Borrar precio',
      message: 'Estás seguro que queres borrar el precio?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Borrar',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  addPrice(){
    let modal = this.modalCtrl.create(ModalPricePage, { title: "Agregar precio", method: "add" });
    modal.present();
  }

}
