import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-modal-price',
  templateUrl: 'modal-price.html'
})
export class ModalPricePage {

  title:string;
  subtitle:string;
  method:string;
  type:string;

  constructor(public params: NavParams) {
    this.title = params.get('title');
    this.method = params.get('method');
    if(this.method == "edit"){
      this.subtitle = params.get('price')+"$";
    }
    
  }

}
