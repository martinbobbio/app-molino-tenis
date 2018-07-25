import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ModalEventPage } from '../pages/modal-event/modal-event';
import { ModalPricePage } from '../pages/modal-price/modal-price';
import { HeaderComponent } from '../components/header/header';
import { FooterComponent } from '../components/footer/footer';
import { TabsComponent } from '../components/tabs/tabs';
import { CalendarPage } from '../pages/calendar/calendar';
import { MoneyPage } from '../pages/money/money';


@NgModule({
  declarations: [
    MyApp,
    ModalEventPage,
    HeaderComponent,
    FooterComponent,
    TabsComponent,
    CalendarPage,
    MoneyPage,
    ModalPricePage
  ],
  imports: [
    BrowserModule,
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
    ModalPricePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
