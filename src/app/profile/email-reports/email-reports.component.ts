import { Component, Input, OnChanges, OnInit,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-email-reports',
  templateUrl: './email-reports.component.html',
  styleUrls: ['./email-reports.component.scss']
})
export class EmailReportsComponent implements OnInit, OnChanges {
  @Input()
  emailReportsData: any;
  @Input() loggedInUserDetails: any;
  @Output() triggerProfile = new EventEmitter<any>();
  emailRepotsForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private alertpopupService: AlertpopupService,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.emailReports();
  }

  ngOnChanges(): void {
    if (this.emailReportsData) {
      this.emailRepotsForm.patchValue({
        weeklyUsage: this.emailReportsData?.weeklyUsage, 
        activityStatus: this.emailReportsData?.activityStatus,
        activitydue: this.emailReportsData?.activitydue,
        sendMeEmail: this.emailReportsData?.sendMeEmail
      })
    }
  }

  emailReports() {
    this.emailRepotsForm = this.formBuilder.group({
      weeklyUsage: [false, [Validators.required]],
      activityStatus: ['None', [Validators.required]],
      activitydue: [false, [Validators.required]],
      sendMeEmail: [false, [Validators.required]]
    })
  }

  onSubmit() {
    if (this.loggedInUserDetails._id) {
      var obj = {
        weeklyUsage: this.emailRepotsForm.value.weeklyUsage ,
        activityStatus: this.emailRepotsForm.value.activityStatus,
        activitydue: this.emailRepotsForm.value.activitydue,
        sendMeEmail: this.emailRepotsForm.value.sendMeEmail ,
        _id: this.loggedInUserDetails._id
      }
      this.profileService.updateEmailReport(this.loggedInUserDetails._id, obj).subscribe((res: any) => {
        this.alertpopupService.open({
          message : res.message ? res.message : 'Email Reports updated successfully',
          action : 'Ok'
        });
        this.triggerProfile.emit();
      },(error) =>{
        this.alertpopupService.open({
          message : error.error.message ? error.error.message : 'Something went wrong! Please try Again',
          action : 'Ok'
        })
      })
    }
  }
  resetFormValues(){
    this.emailRepotsForm.reset()
  }
}
