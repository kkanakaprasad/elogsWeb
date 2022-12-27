import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnChanges {
  @Input() notifications: any
  @Input() loggedInUserDetails: any;
  notificationRepotsForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this.notificationReport();
  }

  ngOnChanges(): void {
    if (this.notifications) {
      this.notificationRepotsForm.patchValue({
        allnewactivity: this.notifications.allNewActivity ? 'Yes' : 'No',
        allnewactivityreply: this.notifications.allActivityRepaly ? 'Yes' : 'No',
        allactivitystatus: this.notifications.allActivityStatusChange ? 'Yes' : 'No'
      })
    }
  }

  notificationReport() {
    this.notificationRepotsForm = this.formBuilder.group({
      allnewactivity: ['', [Validators.required]],
      allnewactivityreply: ['', [Validators.required]],
      allactivitystatus: ['', [Validators.required]],
    })
  }

  onSubmit() {
    if (this.loggedInUserDetails._id) {
      var obj = {
        allNewActivity: this.notificationRepotsForm.value.allnewactivity === 'Yes' ? true : false,
        allActivityRepaly: this.notificationRepotsForm.value.allnewactivityreply === 'Yes' ? true : false,
        allActivityStatusChange: this.notificationRepotsForm.value.allactivitystatus === 'Yes' ? true : false,
        _id: this.loggedInUserDetails._id
      }
      this.profileService.updateNotifications(this.loggedInUserDetails._id, obj).subscribe((res: any) => {
        console.log(res)
      })
    }
  }
}