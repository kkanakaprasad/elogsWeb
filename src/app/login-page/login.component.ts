import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide: boolean= true
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
  }

  
  loginFormDetails(){
    this.loginForm =this.formBuilder.group({
      email: ['', Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),],
      password: ['', Validators.required],
    })

    
  }
 

  ngOnInit(): void {
    this.loginFormDetails()

  }
  onSubmit(){
    console.log(this.loginForm)
  }

}