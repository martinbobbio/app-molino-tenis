import { Component } from '@angular/core';
import { ModalController, LoadingController, ToastController } from 'ionic-angular';
import { ModalPricePage } from '../../pages/modal-price/modal-price';
import { AlertController } from 'ionic-angular';
import { MoneyService } from '../../providers/money/money.service'


@Component({
  selector: 'app-prices',
  templateUrl: 'prices.html'
})
export class PricesComponent {

  prices:any

  constructor(public modalCtrl: ModalController,public toastCtrl:ToastController, private alertCtrl: AlertController,
    public moneyService:MoneyService, public loadingCtrl: LoadingController) {
    this.charguePrices()
  }

  editPrice(price){
    let modal = this.modalCtrl.create(ModalPricePage, 
      { title:price.title,price:price.price,id:price.id , method: "edit" });
   modal.present();
   modal.onDidDismiss(data => {
     this.charguePrices()
  });

  }

  deletePrice(price) {
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
            let loading = this.loadingCtrl.create({
              content: 'Borrando...'
            });
            loading.present();
            this.moneyService.deletePrice(price.id).subscribe((response)=>{
              let toast = this.toastCtrl.create({
                message: 'Has editado un precio',
                duration: 3000,
                position: 'bottom'
              });
              loading.dismiss();
              toast.present();
              this.charguePrices()
            })
          }
        }
      ]
    });
    alert.present();
  }

  addPrice(){
    let modal = this.modalCtrl.create(ModalPricePage, { title: "Agregar precio", method: "add" });
    modal.present();
    modal.onDidDismiss(data => {
      this.charguePrices()
   });
  }

  charguePrices(){
    let loading = this.loadingCtrl.create({
      content: 'Cargando precios'
    });
    loading.present();
    this.moneyService.getPrices().subscribe(
      (response)=>{
        this.prices = response.data[0]
        loading.dismiss();
      })
  }

}
