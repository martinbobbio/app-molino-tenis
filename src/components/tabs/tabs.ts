import { Component } from '@angular/core';
import { CalendarPage } from '../../pages/calendar/calendar';
import { MoneyPage } from '../../pages/money/money';
import { HistoryPage } from '../../pages/history/history';
import { NotesPage } from '../../pages/notes/notes';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.html'
})
export class TabsComponent {

  calendar = CalendarPage;
  prices = MoneyPage;
  history = HistoryPage;
  notes = NotesPage;

  constructor() {
  }

}
