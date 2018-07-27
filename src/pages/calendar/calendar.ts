import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { ModalEventPage } from '../../pages/modal-event/modal-event';
import * as $ from 'jquery';
import 'fullcalendar';

@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html'
})
export class CalendarPage {

  constructor(public modalCtrl: ModalController) {
    let this_aux = this;
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
          events: [
            {
              id: 1,
              title  : 'Pitu',
              start  : '2018-07-25T12:00:00',
              end  : '2018-07-25T13:00:00',
              allDay : false // will make the time show
            },
            {
              id: 2,
              title  : 'Pipi',
              start  : '2018-07-25T13:00:00',
              end  : '2018-07-25T14:00:00',
              allDay : false // will make the time show
            }
          ],
          header: {
            left: 'prev,next today,myCustomButton',
            center: 'title',
            right: 'month,agendaDay,list'
        },
          eventClick: function(calEvent, jsEvent, view) {
              console.log(view); 
              console.log(calEvent);
              let modal = this_aux.modalCtrl.create(ModalEventPage, { id: calEvent.id, title: calEvent.title,
                 start: calEvent.start["_i"], end: calEvent.end["_i"] });
              modal.present();
            }
      })
    });
  }

}
