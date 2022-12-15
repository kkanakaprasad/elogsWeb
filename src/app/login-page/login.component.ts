import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertpopupService } from '../shared/alertPopup/alertpopup.service';
import { RouteConstants } from '../shared/constants/routes.constants';
import { REG_EXP_PATTERNS } from '../shared/enums/regex-pattern.enum';
import { STORAGE_KEYS } from '../shared/enums/storage.enum';
import { StorageService } from '../shared/services/storage-service/storage.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean= true
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private loginService:LoginService,
    private storageService:StorageService,
    private alertpopupService: AlertpopupService,
    private router:Router) { 
  }

  
  loginFormDetails(){
    this.loginForm =this.formBuilder.group({
      email: ['',[ Validators.required,Validators.pattern(REG_EXP_PATTERNS.EmailPattern)]],
      password: ['',[ Validators.required]],
    })
    
  }
 

  ngOnInit(): void {
    this.loginFormDetails()

  }
  onSubmit(){
    this.loginService.login(this.loginForm.value).subscribe((res)=>{
      this.storageService.clearLocalStorage();
      this.storageService.setDataToLocalStorage(STORAGE_KEYS.ACCESS_TOKEN,res?.result?.accessToken);
      this.storageService.setDataToLocalStorage(STORAGE_KEYS.ROLE,res?.result?.role[0]);
      this.alertpopupService.open({
        message :res.message,
        action : 'ok'
      })
      this.router.navigate([RouteConstants.DASHBOARD])
      
    },(error)=>{
      this.alertpopupService.open({
        message :'Invalid Email or Password! Please Try Again',
        action : 'ok'
      })
    })
  }

}
