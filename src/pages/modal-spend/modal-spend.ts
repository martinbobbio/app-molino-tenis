import { Component } from '@angular/core';
import { NavParams,AlertController, LoadingController, ToastController, ViewController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { MoneyService } from '../../providers/money/money.service'

@Component({
  selector: 'page-modal-spend',
  templateUrl: 'modal-spend.html'
})
export class ModalSpendPage {

  title:string = "";
  type:string = "";
  method:string = "";
  month:string = "";
  types;
  spends;

  form:FormGroup;

  constructor(public params: NavParams,public moneyService:MoneyService, public alertCtrl:AlertController,
    public toastCtrl:ToastController,public viewCtrl:ViewController, public loadingCtrl:LoadingController) {

    this.title = params.get('title');
    this.method = params.get('method');
    this.month = params.get('month'); 

    if(this.method == "add"){
      let loading = this.loadingCtrl.create({
        content: 'Cargando...'
      });
      loading.present();
      this.moneyService.getPrices().subscribe(
        (response)=>{
          this.types = response.data[0]
          loading.dismiss();
        })
      
      this.form = new FormGroup({
        'title': new FormControl(),
        'price': new FormControl(),
        'count': new FormControl(),
        'type': new FormControl(),
      })
  
      this.form.controls['type'].valueChanges.subscribe(index => 
        this.type = this.types[index].title
      );
    }
    
    

    if(this.method == "view"){
      this.chargueSpend()
    }

  }

  deleteSpend(id){
    let alert = this.alertCtrl.create({
      title: 'Borrar recaudación',
      message: 'Estás seguro que queres borrar la recaudación?',
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
            this.moneyService.deleteSpend(id).subscribe((response)=>{
              let toast = this.toastCtrl.create({
                message: 'Has borrado la recaudacion',
                duration: 3000,
                position: 'bottom'
              });
              loading.dismiss();
              toast.present();
              this.chargueSpend()
            })
          }
        }
      ]
    });
    alert.present();
  }

  submitForm(){
    if(this.form.get("title").value != "" && this.form.get("price").value != "" && this.form.get("count").value != "" && this.type != ""){

      let data = {
        title: this.form.get("title").value,
        price: this.form.get("price").value,
        count: this.form.get("count").value,
        type: this.type,
      }

      this.moneyService.setSpend(data).subscribe(
        (response)=>{
          let toast = this.toastCtrl.create({
            message: 'Has agregado una nueva recaudación',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          this.viewCtrl.dismiss();
        })

    }
  }

  chargueSpend(){
    let loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    loading.present();
    this.moneyService.getSpendByMonthAll(this.month).subscribe((response)=>{
      this.spends = response.data[0]
      loading.dismiss()
    })
  }

}
