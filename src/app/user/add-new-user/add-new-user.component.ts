import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { Roles } from 'src/app/shared/enums/roles.enums';
import { UserService } from '../user.service';



@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {
  OrganizationName:any =['association of container','department1','assoacham','ministry','village tech']
  Users: any;
  addNewUserForm!: FormGroup;
  suchResult: any;
  details: any;

  constructor(private formBuilder: FormBuilder, private userService:UserService, private alertpopupService:AlertpopupService) {
    
   }
   ngOnInit(): void {
    this.addNewUserFormValues();
    this.addNewUserForm.controls['organization'].valueChanges.subscribe((res)=>{
      console.log( this.suchResult=res);
      this.getAllOrganizationsBySearch(res);
    })
    
  }

   addNewUserFormValues(){
    this.addNewUserForm =this.formBuilder.group({
      Name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
      organization: ['', [Validators.required]],
      department: ['', [Validators.required]],
    })
  }
  onSubmit(){
     const payload ={
      ...this.addNewUserForm.value,
      organization : [this.details._id],
      roles : [Roles.User]

    }
    console.log(payload)
    this.userService.addUser(payload).subscribe((res) => {
      this.alertpopupService.open({
        message:"transaction successful",
        action:"ok"
      })
    },(error)=>{
      this.alertpopupService.open({
        message:"something went wrong!",
        action:"ok"

      });
    }); 
   
    
  }
  
  getAllOrganizationsBySearch(searchString : string){
    this.userService.getOrganization(searchString).subscribe((res)=>{
      this.Users = res;
      this.details=this.Users.organizations
    })
}

}
