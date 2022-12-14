import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {
    
   }
   addNewUserForm!: FormGroup;


   addNewUserFormValues(){
    this.addNewUserForm =this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      organizationNameToBeAssigned: ['', Validators.required],
      departmentName: ['', Validators.required],
    })

    
  }
  onSubmit(){
    console.log(this.addNewUserForm.value)

  }
 

  ngOnInit(): void {
    this.addNewUserFormValues()
  }


}
