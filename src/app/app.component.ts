import { Component } from '@angular/core';
import { HttpDataService } from './shared/services/http-service/http-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
  })
export class AppComponent {
  title = 'elog-web';

  constructor(public httpDataService:HttpDataService){
  }
}
