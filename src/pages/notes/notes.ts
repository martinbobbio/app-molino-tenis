import { Component } from '@angular/core';
import { NoticeService } from '../../providers/notice/notice.service'
import { ModalNoticePage } from '../../pages/modal-notice/modal-notice'
import { LoadingController, AlertController, ToastController, ModalController, Modal } from 'ionic-angular';
import { environment } from '../../environments/environment'

@Component({
  selector: 'notes',
  templateUrl: 'notes.html'
})
export class NotesPage {

  notes;
  pathBack = environment.backUrl;
  userPhoto = localStorage.getItem("user_photo");

  constructor(public alertCtrl:AlertController,public modalCtrl:ModalController, public toastCtrl:ToastController, public noticeService:NoticeService, public loadingCtrl:LoadingController ) {
   this.getNotices();
  }

  getNotices(){
    let loading = this.loadingCtrl.create({
      content: 'Cargando notas'
    });
    loading.present();
    this.noticeService.getNotices().subscribe(
      (response)=>{
        this.notes = response.data[0]
        loading.dismiss();
      })
  }id

  deleteNotice(id){
    let alert = this.alertCtrl.create({
      title: 'Borrar noticia',
      message: 'Estás seguro que queres borrar la noticia?',
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
            this.noticeService.deleteNotice(id).subscribe((response)=>{
              let toast = this.toastCtrl.create({
                message: 'Has borrado la noticia',
                duration: 3000,
                position: 'bottom'
              });
              loading.dismiss();
              toast.present();
              this.getNotices()
            })
          }
        }
      ]
    });
    alert.present();
  }

  createNotice(){
    let modal = this.modalCtrl.create(ModalNoticePage);
    modal.present();
    modal.onDidDismiss(data => {
      this.getNotices()
   });
  }

}
