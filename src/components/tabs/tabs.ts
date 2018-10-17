import { Component } from '@angular/core';
import { CalendarPage } from '../../pages/calendar/calendar';
import { PricesPage } from '../../pages/prices/prices';
import { FinancePage } from '../../pages/finance/finance';
import { NotesPage } from '../../pages/notes/notes';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.html'
})
export class TabsComponent {

  calendar = CalendarPage;
  prices = PricesPage;
  finance = FinancePage;
  notes = NotesPage;

  constructor() {
  }

}
