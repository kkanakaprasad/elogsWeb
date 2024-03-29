import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertpopupService } from '../shared/alertPopup/alertpopup.service';
import { FILTER_CONSTANT } from '../shared/constants/filter.constants';
import { STORAGE_KEYS } from '../shared/enums/storage.enum';
import { StorageService } from '../shared/services/storage-service/storage.service';
import { CreateProfile, UpdateProfileSearchCriteria } from './profile.interface';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  profileDetails: any;
  userProfileDetails: any;
  loggedInUserDetails: any;
  emailReports: any;
  userId: any;
  notifications: any
  loggedInUserEmail: string = "";
  selected: any = new FormControl('0');


  userTypes: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private profileService: ProfileService,
    private storageService: StorageService,
    private alertpopupService: AlertpopupService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.queryParams.subscribe((res: any) => {
      if(res && res['tab']){
        this.selected.setValue(res['tab']);
      }else{
        this.selected.setValue('0');
      }
    })
  }

  ngOnInit(): void {
    this.getProfileByUserId();
    this.profileFormValues();
    this.getUserByUserID();

  }


  profileFormValues() {
    this.profileForm = this.formBuilder.group({
      Name: ['', Validators.required],
      email: ['', Validators.required],
      shortName: ['', Validators.required],
      // timeZone: ['', Validators.required]

    })
  }

  getUserByUserID() {
    this.profileService.getUserById(this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID)).subscribe((res: any) => {
      this.loggedInUserDetails = res?.existingUser;
      this.profileForm.controls['Name'].setValue(this.loggedInUserDetails.Name);
      this.profileForm.controls['email'].setValue(this.loggedInUserDetails.email);
      this.loggedInUserEmail = this.loggedInUserDetails?.email
    })
  }


  getProfileByUserId() {
    this.profileService.getProfileByUserId(this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID)).subscribe((res: any) => {
      this.profileDetails = res.profile;
      this.emailReports = res?.profile.emailReports;
      this.notifications = res?.profile.notifications;
      this.profileForm.controls['shortName'].setValue(this.profileDetails.shortName);
      // this.profileForm.controls['timeZone'].setValue(this.profileDetails.timeZone);
      this.profileForm.controls['email'].setValue(this.profileDetails.email)

    }, (error) => {
    })
  }

  createProfile() {

    const payload: CreateProfile = {
      ...this.profileForm.value,
      userId: this.storageService.getDataFromLocalStorage(STORAGE_KEYS.USER_ID),
      timeZone: "timeZone",
      profileImage: "image.com"

    }

    if (this.profileDetails && this.profileDetails._id) {
      this.profileService.updateProfile(this.profileDetails._id, payload).subscribe((res) => {
        this.alertpopupService.open({
          message: res.message ? res.message : 'Profile Updated Successfully',
          action: 'ok'
        })
      }, (error) => {
        this.alertpopupService.open({
          message: error.message ? error.message : 'Something Faild to update Profile',
          action: 'ok'
        })
      })
    } else {
      this.profileService.createProfile(payload).subscribe((res) => {
        this.alertpopupService.open({
          message: res.message ? res.message : 'Profile Updated Successfully',
          action: 'ok'
        })
      }, (error) => {
        this.alertpopupService.open({
          message: error.message ? error.message : 'Something Faild to update Profile',
          action: 'ok'
        })
      })
    }

  }


  getAllUsers() {
    this.profileService.getUser().subscribe(res => {
      this.userTypes = res
    })
  }

  onSubmit() {
    this.createProfile();
  }

  resetFormValues() {
    this.profileForm.reset()
  }

}











