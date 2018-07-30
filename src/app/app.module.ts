import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AuthService } from '../providers/auth/auth.service';
import { MoneyService } from '../providers/money/money.service';
import { EventService } from '../providers/event/event.service';
import { NoticeService } from '../providers/notice/notice.service';

import { MyApp } from './app.component';
import { ModalEventPage } from '../pages/modal-event/modal-event';
import { ModalPricePage } from '../pages/modal-price/modal-price';
import { ModalSpendPage } from '../pages/modal-spend/modal-spend';
import { ModalNoticePage } from '../pages/modal-notice/modal-notice';
import { HeaderComponent } from '../components/header/header';
import { FooterComponent } from '../components/footer/footer';
import { TabsComponent } from '../components/tabs/tabs';
import { PricesComponent } from '../components/prices/prices';
import { CalendarPage } from '../pages/calendar/calendar';
import { MoneyPage } from '../pages/money/money';
import { LoginPage } from '../pages/login/login';
import { HistoryPage } from '../pages/history/history';
import { NotesPage } from '../pages/notes/notes';


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
    ModalSpendPage,
    LoginPage,
    HistoryPage,
    PricesComponent,
    NotesPage,
    ModalNoticePage,
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
    ModalSpendPage,
    HistoryPage,
    NotesPage,
    ModalNoticePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    MoneyService,
    EventService,
    NoticeService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
