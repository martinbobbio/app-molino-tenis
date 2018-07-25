import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as moment from 'moment';


@Component({
  selector: 'page-modal-event',
  templateUrl: 'modal-event.html'
})
export class ModalEventPage {

  title:string;
  id:number;
  start:any;
  end:any;

  subtitle:string;

  constructor(public params: NavParams) {
    this.title = params.get('title');
    this.id = params.get('id');
    this.start = params.get('start');
    this.end = params.get('end');
    this.subtitle = `${moment(this.start).format('DD/MM | HH:mm')} a ${moment(this.end).format('HH:mm')}`;
    
  }

}
