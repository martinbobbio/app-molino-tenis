import { Component } from '@angular/core';
import { FinanceService } from '../../providers/finance/finance.service'
import { ModalFinancePage } from '../modal-finance/modal-finance'
import { LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';

@Component({
  selector: 'finance',
  templateUrl: 'finance.html'
})
export class FinancePage {

  finances;

  constructor(public financeService:FinanceService,public modalCtrl:ModalController, public loadingCtrl:LoadingController, public alertCtrl:AlertController, public toastCtrl:ToastController) {

    this.chargueFinances();

  }

  changueValue(value,count,id ,refresh?:boolean){

    if(value == 1)
      count++;
    else
      count--;

    if(refresh == true){
      let alert = this.alertCtrl.create({
        title: 'Reiniciar abono',
        message: 'Estás seguro que queres reiniciar el abono?',
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {
            }
          },
          {
            text: 'Reiniciar',
            handler: () => {
              this.financeService.changeFinance(id,count).subscribe((response)=>{
                this.chargueFinances();
              })
            }
          }
        ]
      });
      alert.present();
    }

    if(refresh !== true){
      this.financeService.changeFinance(id,count).subscribe((response)=>{
        this.chargueFinances();
      })
    }

  }

  delete(id){
    let alert = this.alertCtrl.create({
      title: 'Borrar abono',
      message: 'Estás seguro que queres borrar el abono?',
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
            this.financeService.deleteFinance(id).subscribe((response)=>{
              let toast = this.toastCtrl.create({
                message: 'Has borrado el abono',
                duration: 3000,
                position: 'bottom'
              });
              loading.dismiss();
              toast.present();
              this.chargueFinances()
            })
          }
        }
      ]
    });
    alert.present();
  }

  createFinance(){
    let modal = this.modalCtrl.create(ModalFinancePage);
    modal.present();
    modal.onDidDismiss(data => {
      this.chargueFinances()
   });
  }

  chargueFinances(){
    let loading = this.loadingCtrl.create({
      content: 'Cargando abonos...'
    });
    loading.present();
    this.financeService.getFinances().subscribe((response)=>{
      this.finances = response.data[0];
      console.log(this.finances);
      loading.dismiss();
    })
  }


}
