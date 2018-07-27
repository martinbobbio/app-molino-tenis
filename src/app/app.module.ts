import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AuthService } from '../providers/auth.service';

import { MyApp } from './app.component';
import { ModalEventPage } from '../pages/modal-event/modal-event';
import { ModalPricePage } from '../pages/modal-price/modal-price';
import { HeaderComponent } from '../components/header/header';
import { FooterComponent } from '../components/footer/footer';
import { TabsComponent } from '../components/tabs/tabs';
import { CalendarPage } from '../pages/calendar/calendar';
import { MoneyPage } from '../pages/money/money';
import { LoginPage } from '../pages/login/login';




@NgModule({
  declarations: [
    MyApp,
    ModalEventPage,
    HeaderComponent,
    FooterComponent,
    TabsComponent,
    CalendarPage,
    MoneyPage,
    ModalPricePage,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ModalEventPage,
    HeaderComponent,
    TabsComponent,
    CalendarPage,
    MoneyPage,
    ModalPricePage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
