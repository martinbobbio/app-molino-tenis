import { Component, Input } from '@angular/core';
import { ViewController } from 'ionic-angular';

import * as $ from 'jquery';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.html'
})
export class FooterComponent {

  @Input() title:string;
  @Input() modalDismiss:boolean = false;
  @Input() color:string = "#e53935";

  constructor(public viewCtrl: ViewController) {
  }

  action(){
    if(this.modalDismiss){
      this.viewCtrl.dismiss();
    }
  }

}
