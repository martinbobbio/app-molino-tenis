import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth/auth.service';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'history',
  templateUrl: 'history.html'
})
export class HistoryPage {

  history;

  constructor(public authService:AuthService, public loadingCtrl:LoadingController) {
    let loading = this.loadingCtrl.create({
      content: 'Cargando historal'
    });
    loading.present();
    this.authService.getLogs().subscribe(
      (response)=>{
        this.history = response.data[0]
        loading.dismiss();
      })
  }

}
