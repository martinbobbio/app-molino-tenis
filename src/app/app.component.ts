import { Component } from '@angular/core';
import { Platform, App, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsComponent } from '../components/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { HistoryPage } from '../pages/history/history';

import { AuthService } from '../providers/auth/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  rootPage:any;

  username = localStorage.getItem("user_username");
  photo = localStorage.getItem("user_photo");

  navCtrl;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, protected app: App, public authService:AuthService, public menuCtrl: MenuController) {
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
}

