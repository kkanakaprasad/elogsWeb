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
  logedinUserEmail: any
  changePasswordForm!: FormGroup;
  password: any;

  constructor(
    private formBuilder: FormBuilder,
    private changePasswordService: ChangePasswordService,

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
