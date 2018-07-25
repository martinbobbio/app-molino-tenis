import { Component } from '@angular/core';
import { CalendarPage } from '../../pages/calendar/calendar';
import { MoneyPage} from '../../pages/money/money';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.html'
})
export class TabsComponent {

  calendar = CalendarPage;
  prices = MoneyPage;

  constructor() {
  }

}
