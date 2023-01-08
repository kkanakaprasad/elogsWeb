import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnChanges {
  @Input() notifications: any
  @Input() loggedInUserDetails: any;
  @Output() triggerProfile = new EventEmitter<any>();
  notificationRepotsForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private alertpopupService: AlertpopupService,
  ) { }

  ngOnInit(): void {
    this.notificationReport();
  }

  ngOnChanges(): void {
    if (this.notifications) {
      this.notificationRepotsForm.patchValue({
        allnewactivity: this.notifications?.allNewActivity,
        allnewactivityreply: this.notifications?.allActivityRepaly,
        allactivitystatus: this.notifications?.allActivityStatusChange
      })
    }
  }

  notificationReport() {
    this.notificationRepotsForm = this.formBuilder.group({
      allnewactivity: [false, [Validators.required]],
      allnewactivityreply: [false, [Validators.required]],
      allactivitystatus: [false, [Validators.required]],
    })
  }

  onSubmit() {
    if (this.loggedInUserDetails._id) {
      var obj = {
        allNewActivity: this.notificationRepotsForm.value.allnewactivity,
        allActivityRepaly: this.notificationRepotsForm.value.allnewactivityreply,
        allActivityStatusChange: this.notificationRepotsForm.value.allactivitystatus,
        _id: this.loggedInUserDetails._id
      }
      this.profileService.updateNotifications(this.loggedInUserDetails._id, obj).subscribe((res: any) => {
        this.alertpopupService.open({
          message : res.message ? res.message : 'Notifications updated successfully',
          action : 'Ok'
        })
        this.triggerProfile.emit();
      },(error) =>{
        this.alertpopupService.open({
          message : error.error.message ? error.error.message : 'Something went wrong! Please try Again',
          action : 'Ok'
        })
      })
    }
  }
}