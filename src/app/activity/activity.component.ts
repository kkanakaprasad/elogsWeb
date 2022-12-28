import { Component, OnInit } from '@angular/core';
import { ActivityService } from './activity.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
  
  filters=['Created Date','Due Date','Status','Types','Entry Type','GeoGraphy','Scope','Priority','Created By','Assigned to']
  groupby=['Due Date','Status','Priority','Assigned to']
  sortby=['Tittle','Activity#','Due Date','Assigned to']
  constructor(
    private activityService :ActivityService
  ) { }

  ngOnInit(): void {
    this.getAllActivities();
  }

  downloadFile(){

  }
  getAllActivities(){
    this.activityService.getAllActivities().subscribe((res) => {
      console.log(res);
  })
}
}
