import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  emailRepotsForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private profileService: ProfileService) { }

  ngOnInit(): void {
    this.emailReports();
  }

  ngOnChanges(): void {
    if (this.emailReportsData) {
      this.emailRepotsForm.patchValue({
        weeklyUsage: this.emailReportsData.weeklyUsage ? 'Yes' : 'No',
        activityStatus: this.emailReportsData.activityStatus,
        activitydue: this.emailReportsData.activitydue ? 'Yes' : 'No',
        sendMeEmail: this.emailReportsData.sendMeEmail ? 'Yes' : 'No'
      })
    }
  }

  emailReports() {
    this.emailRepotsForm = this.formBuilder.group({
      weeklyUsage: ['', [Validators.required]],
      activityStatus: ['None', [Validators.required]],
      activitydue: ['', [Validators.required]],
      sendMeEmail: ['', [Validators.required]]
    })
  }

  activityChange(e: any) {
    this.emailRepotsForm.patchValue({ activityStatus: e.value })
  }

  onSubmit() {
    if (this.loggedInUserDetails._id) {
      var obj = {
        weeklyUsage: this.emailRepotsForm.value.weeklyUsage === 'Yes' ? true : false,
        activityStatus: this.emailRepotsForm.value.activityStatus,
        activitydue: this.emailRepotsForm.value.activitydue === 'Yes' ? true : false,
        sendMeEmail: this.emailRepotsForm.value.sendMeEmail === 'Yes' ? true : false,
        _id: this.loggedInUserDetails._id
      }
      this.profileService.updateEmailReport(this.loggedInUserDetails._id, obj).subscribe((res: any) => {
        console.log(res)
      })
    }
  }



}
