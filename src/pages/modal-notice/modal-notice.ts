import { Component } from '@angular/core';
import { NavParams, ToastController, ViewController } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { NoticeService } from '../../providers/notice/notice.service'


@Component({
  selector: 'page-modal-notice',
  templateUrl: 'modal-notice.html'
})
export class ModalNoticePage {

  title:string;
  form:FormGroup;

  constructor(public params: NavParams,public viewCtrl:ViewController, public noticeService:NoticeService, public toastCtrl:ToastController) {
    this.title = params.get('title');

    this.form = new FormGroup({
      'title': new FormControl(),
      'description': new FormControl(),
    })

  }

  submitForm(){
    if(this.form.get("title").value != "" && this.form.get("description").value != ""){

      let data = {
        title: this.form.get("title").value,
        description: this.form.get("description").value,
      }
      this.noticeService.createNote(data).subscribe(
        (response)=>{
          let toast = this.toastCtrl.create({
            message: 'Has agregado una nueva nota',
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          this.viewCtrl.dismiss();
        })

      

    }

  }

}
