import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-reports',
  templateUrl: './email-reports.component.html',
  styleUrls: ['./email-reports.component.scss']
})
export class EmailReportsComponent implements OnInit {
  emailRepotsForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.emailReports();
  }

  emailReports() {
    this.emailRepotsForm = this.formBuilder.group({
      WeeklyUsage: ['', Validators.required],
      ActivityStatus: ['', Validators.required],
      ActivityDue: ['', Validators.required],
      SendEmail: ['', Validators.required]

    })
  }

  getEmailReports(){

  }
  onSubmit(){}

}
