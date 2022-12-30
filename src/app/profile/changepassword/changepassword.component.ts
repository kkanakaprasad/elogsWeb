import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { REG_EXP_PATTERNS } from 'src/app/shared/enums/regex-pattern.enum';
import { ChangePassword } from './ChangePassword.Interface';
import { ChangePasswordService } from './changePassword.service';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {
  @Input()
  logedinUserEmail: string = "";
  changePasswordForm!: FormGroup;
  password: any;
  triggerProfile: any;

  constructor(
    private formBuilder: FormBuilder,
    private changePasswordService: ChangePasswordService,
    private alertpopupService:AlertpopupService

  ) {

  }

  ngOnInit(): void {
    this.changePassword();
  }

  changePassword() {
    this.changePasswordForm = this.formBuilder.group({
      OldPassword: ['',[Validators.required]],
      NewPassword: ['',[Validators.required,Validators.pattern(REG_EXP_PATTERNS.PasswordPattern)]],
      ConfirmPassword: ['',[Validators.required,Validators.pattern(REG_EXP_PATTERNS.PasswordPattern)]],

    })

  }

  onSubmit() {

    const payload: ChangePassword = {
      email: this.logedinUserEmail,
      oldPassword: this.changePasswordForm.controls['OldPassword']?.value,
      newPassword: this.changePasswordForm.controls['NewPassword']?.value
    }
    this.changePasswordService.changePassword(payload).subscribe((res) => {
      console.log(res);
      this.alertpopupService.open({
        message : res.message ? res.message : 'Change Password updated successfully',
        action : 'Ok'
      });
      this.triggerProfile.emit();
    },(error) =>{
      this.alertpopupService.open({
        message : error.error.message ? error.error.message : 'Something went wrong! Please try Again',
        action : 'Ok'
      })
    }
    
    
    
    )
  }
  resetPaswordForm(){
    this.changePasswordForm = this.formBuilder.group({
      currentPassword : ['',[Validators.required]],
      password : ['',[Validators.required,Validators.pattern(REG_EXP_PATTERNS.PasswordPattern)]],
      confirmPassword : ['',[Validators.required]]
    })
  }

}