import { Component } from '@angular/core';
import { Platform, App, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal } from '@ionic-native/onesignal';

import { TabsComponent } from '../components/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { HistoryPage } from '../pages/history/history';
import { MoneyPage } from '../pages/money/money';

import { AuthService } from '../providers/auth/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;

  username = localStorage.getItem("user_username");
  photo = localStorage.getItem("user_photo");

  navCtrl;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private alertCtrl: AlertController, protected app: App,private oneSignal:OneSignal, public authService:AuthService, public menuCtrl: MenuController) {
    if(localStorage.getItem("user_id")){
      this.rootPage = TabsComponent
      //this.navCtrl = this.app.getRootNav();
    }else{
      this.rootPage = LoginPage
    }
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.handlerNotifications();
    });
  }

  logout(){
    this.authService.logout();
  }

  goLogs(){
    this.navCtrl = this.getNavCtrl();
    this.menuCtrl.toggle();
    this.navCtrl.push(HistoryPage);
  }

  getNavCtrl() {
    return this.app.getRootNav();
  }

  goMoney(){
    this.navCtrl = this.getNavCtrl();
    this.menuCtrl.toggle();
    this.navCtrl.push(MoneyPage);
  }

  handlerNotifications(){
    this.oneSignal.startInit('e1c87ab8-7125-4f76-9eb3-a0f468d37176', '1048869822339');
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationOpened()
    .subscribe(jsonData => {
      let alert = this.alertCtrl.create({
        title: jsonData.notification.payload.title,
        subTitle: jsonData.notification.payload.body,
        buttons: ['OK']
      });
      alert.present();
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
    this.oneSignal.endInit();
    }
}
