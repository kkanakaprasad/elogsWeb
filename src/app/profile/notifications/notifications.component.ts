import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notificationRepotsForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.notificationReport();
  }

  notificationReport() {
    this.notificationRepotsForm = this.formBuilder.group({
      allnewactivity: ['', Validators.required],
      allnewactivityreply: ['', Validators.required],
      allactivitystatus: ['', Validators.required],
    })
  }

  onSubmit() { }

  
}
