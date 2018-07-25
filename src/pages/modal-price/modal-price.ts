import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-modal-price',
  templateUrl: 'modal-price.html'
})
export class ModalPricePage {

  title:string;
  subtitle:string;

  constructor(public params: NavParams) {
    this.title = params.get('title');
    this.subtitle = params.get('price')+"$";
    
  }

}
