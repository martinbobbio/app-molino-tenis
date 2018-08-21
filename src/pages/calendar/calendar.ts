import { Component } from '@angular/core';
import { ModalController,LoadingController } from 'ionic-angular';
import { ModalEventPage } from '../../pages/modal-event/modal-event';
import { EventService } from '../../providers/event/event.service';
import * as $ from 'jquery';
import 'fullcalendar';

@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

  events = [];

  constructor(public modalCtrl: ModalController, public loadingCtrl:LoadingController, public eventService:EventService) {

    let this_aux = this;

    this_aux.chargueEvents();

    $(function() {
      $('#calendar').fullCalendar({
        themeSystem: 'bootstrap3',
        defaultView: 'list',
        height: 500,
        timeFormat: 'HH:mm',
        customButtons: {
          myCustomButton: {
            text: 'Agregar...',
            click: function() {
              let modal = this_aux.modalCtrl.create(ModalEventPage, { method: "add", title: "Nuevo evento" });
              modal.present();
              modal.onDidDismiss(data => {
                this_aux.chargueEvents()
             });
            }
          }
        },
        buttonText: {
          today:    'Hoy',
          month:    'Mes',
          week:     'Sem',
          day:      'Dia',
          list:     'Lista'
        },
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
        views: {
          month: {
          }
        },
        header: {
          left: 'prev,next today,myCustomButton',
          center: 'title',
          right: 'month,agendaDay,list'
      },
        eventClick: function(calEvent, jsEvent, view) {
            let modal = this_aux.modalCtrl.create(ModalEventPage, { id: calEvent.id, title: calEvent.title,
              start: calEvent.start["_i"], end: calEvent.end["_i"], method: "edit", is_suspended: calEvent.className });
            modal.present();
            modal.onDidDismiss(data => {
              this_aux.chargueEvents()
            });
          }
    })
  });
  }

  calculateEndEvent(hour,hours){
    if(hour.split(":")[1] == "00"){
      if(hours == 1)
        return Number(hour.split(":")[0])+1+":00"
      if(hours == 2)
        return Number(hour.split(":")[0])+1+":30"
      if(hours == 3)
        return Number(hour.split(":")[0])+2+":00"
      if(hours == 4)
        return Number(hour.split(":")[0])+2+":30"
      if(hours == 5)
        return Number(hour.split(":")[0])+3+":00"
    }
    if(hour.split(":")[1] == "30"){
      if(hours == 1)
        return Number(hour.split(":")[0])+1+":30"
      if(hours == 2)
        return Number(hour.split(":")[0])+2+":00"
      if(hours == 3)
        return Number(hour.split(":")[0])+2+":30"
      if(hours == 4)
        return Number(hour.split(":")[0])+3+":00"
      if(hours == 5)
        return Number(hour.split(":")[0])+3+":30"
    }
    
  }

  checkHourEndEvent(hour){
    if(hour == "9:30" || hour == "9:00" || hour == "8:30" || hour == "8:00")
      return "0"+hour;
    else
      return hour;
  }

  chargueEvents(){
    let this_aux = this;
    let loading = this.loadingCtrl.create({
      content: 'Cargando eventos'
    });
    loading.present();
    this.eventService.getEvents().subscribe((response)=>{
      this.events = [];
      for (var e of response.data[0]) {
        let className;
        if(e.is_suspended)
          className = "underline";
        
        this.events.push({
          id : e.id,
          title: `${e.type} ${e.title}`,
          start: e.date+"T"+e.hour+":00",
          end: e.date+"T"+this.checkHourEndEvent(this.calculateEndEvent(e.hour,e.hours))+":00",
          color: '#'+e.color,
          className: className
        })
      }
      loading.dismiss()
      $(function() {
        $('#calendar').fullCalendar('removeEvents');
        $('#calendar').fullCalendar( 'addEventSource', this_aux.events);         
        $('#calendar').fullCalendar( 'rerenderEvents' );
      })
    })
  }

}
