import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  @Input() title:string;
  @Input() subtitle:string;

  constructor() {
    
    
  }

}
