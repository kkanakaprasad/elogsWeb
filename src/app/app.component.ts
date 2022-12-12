import { Component } from '@angular/core';
import { AlertpopupService } from './shared/components/alertPopup/alertpopup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
  })
export class AppComponent {
  title = 'elog-web';
  constructor(private alertPopup:AlertpopupService){
    
  }
}
