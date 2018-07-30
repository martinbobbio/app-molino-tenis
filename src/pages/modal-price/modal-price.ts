import { Component } from '@angular/core';
import { NavParams, ToastController, ViewController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { MoneyService } from '../../providers/money/money.service'


@Component({
  selector: 'page-modal-price',
  templateUrl: 'modal-price.html'
})
export class ModalPricePage {

  title:string;
  subtitle:string;
  method:string;
  type:string = "Clases";
  typesArray = []
  id:number;

  form:FormGroup;

  constructor(public params: NavParams,public viewCtrl:ViewController, public moneyService:MoneyService, public toastCtrl:ToastController) {
    this.title = params.get('title');
    this.method = params.get('method');
    if(this.method == "edit"){
      this.subtitle = params.get('price')+"$";
      this.id = params.get("id");
    }

    this.form = new FormGroup({
      'title': new FormControl(),
      'price': new FormControl(),
      'type': new FormControl(),
    })

    this.typesArray[1] = "Clases"
    this.typesArray[2] = "Articulo"
    this.typesArray[3] = "Promoción"
    this.typesArray[4] = "Otro"
    

    this.form.controls['type'].valueChanges.subscribe(type => 
      this.type = this.typesArray[type]
    );

  }

  submitForm(){
    if(this.form.get("title").value != "" && this.form.get("price").value != ""){

      let data = {
        title: this.form.get("title").value,
        price: this.form.get("price").value,
        type: this.type,
        id: this.id
      }
      if(this.method == "add"){
        this.moneyService.setPrice(data).subscribe(
          (response)=>{
            let toast = this.toastCtrl.create({
              message: 'Has agregado un nuevo precio',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            this.viewCtrl.dismiss();
          })
      }else if(this.method == "edit"){
        this.moneyService.editPrice(data).subscribe(
          (response)=>{
            let toast = this.toastCtrl.create({
              message: 'Has editado un precio',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            this.viewCtrl.dismiss();
          })
      }
      

    }

  }

}
