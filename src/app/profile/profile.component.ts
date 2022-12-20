import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  changePassword() {
    this.router.navigate(['profile/changePassword'])
  }
  profileFormValues() {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      shortName: ['', Validators.required],
      timezone: ['', Validators.required]

    })
  }
  onSubmit() {
    this.router.navigate(['profile/profile'])
  }


}
