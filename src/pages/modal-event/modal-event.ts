import { Component } from '@angular/core';
import { NavParams, ToastController, ViewController, LoadingController,AlertController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { EventService } from '../../providers/event/event.service';
import * as $ from 'jquery';

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
  types;
  type:string;
  hours:number = 1;
  hour:string;

  titleString:string;

  method:string;
  subtitle:string;

  chargue:boolean = false;
  event;

  form:FormGroup;

  constructor(public params: NavParams,public alertCtrl:AlertController,public loadingCtrl:LoadingController, public eventService:EventService, public toastCtrl:ToastController, public viewCtrl:ViewController) {
    this.title = params.get('title');
    this.id = params.get('id');
    this.start = params.get('start');
    this.end = params.get('end');
    this.method = params.get('method');
    
    if(this.method == "add"){
      this.chargue = true
    }

    this.form = new FormGroup({
      'title': new FormControl(),
      'type': new FormControl(),
      'date': new FormControl(),
      'hour': new FormControl(),
      'hours': new FormControl(),
    })

    this.eventService.getTypeEvents().subscribe((response)=>{
      this.types = response.data[0]
      this.form.controls['type'].valueChanges.subscribe(index => 
        this.type = this.types[index].title
      );
    })

    this.form.controls['hours'].valueChanges.subscribe(index => 
      this.hours = index
    );

    this.form.controls['hour'].valueChanges.subscribe(index => 
      this.hour = index
    );

    if(this.method == "edit"){
      this.title = "Editar Evento"
      let loading = this.loadingCtrl.create({
        content: 'Cargando evento'
      });
      loading.present();
      this.eventService.getEvent(this.id).subscribe((response)=>{
        loading.dismiss();
        this.event = response.data[0];
        this.titleString = this.event.title;
        this.hour = this.event.hour;
        this.type = this.event.type;
        this.hours = this.event.hours;
        setTimeout(() => {
          $(".datetime-text").text(this.event.date);
          $(".datetime-text").removeClass("datetime-placeholder");
        }, 500);
        this.chargue = true;
      })
    }
    
  }

  submitForm(){

    let date = $(".datetime-text")[0]["innerText"];

    if(this.form.get("title").value != "" && this.type && this.hour && date != ""){
      let data = {
        title: this.form.get("title").value,
        type: this.type,
        hour: this.hour,
        hours: this.hours,
        date: date,
        id: this.id
      }
      if(this.method == "add"){
        this.eventService.createEvent(data).subscribe(
          (response)=>{
            let toast = this.toastCtrl.create({
              message: 'Has agregado un nuevo evento',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            this.viewCtrl.dismiss();
          })
      }else if(this.method == "edit"){
        this.eventService.editEvent(data).subscribe(
          (response)=>{
            let toast = this.toastCtrl.create({
              message: 'Has editado un evento',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            this.viewCtrl.dismiss();
          })
      }
    }
  }

  deleteEvent(){
    let alert = this.alertCtrl.create({
      title: 'Borrar evento',
      message: 'Estás seguro que queres borrar el evento?',
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
            this.eventService.deleteEvent(this.id).subscribe((response)=>{
              let toast = this.toastCtrl.create({
                message: 'Has borrado la recaudacion',
                duration: 3000,
                position: 'bottom'
              });
              loading.dismiss();
              toast.present();
              this.viewCtrl.dismiss();
            })
          }
        }
      ]
    });
    alert.present();
  }


  getHoursString(hours){
    if(hours == 1)
      return "1 hora"
    if(hours == 2)
      return "1 hora y media"
    if(hours == 3)
      return "2 horas"
    if(hours == 4)
      return "2 Horas y media"
    if(hours == 5)
      return "3 Horas"
  }

}
