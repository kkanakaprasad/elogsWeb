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
    
    setTimeout(()=>{
      this.alertPopup.open({
        message:"hello This is snackbar",
        action:'Ok'
      })
    },3000)
  }
}
