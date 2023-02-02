import { AfterContentChecked, Component } from '@angular/core';
import { HttpDataService } from './shared/services/http-service/http-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  
  })
export class AppComponent implements AfterContentChecked {
  title = 'elog-web';
  loadingCount :number = this.httpDataService.loadingCount;

  constructor(public httpDataService:HttpDataService){
  }

  ngAfterContentChecked() {
    this.loadingCount = this.httpDataService.loadingCount
  }
    
}
