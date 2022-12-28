import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { OrganizationService } from 'src/app/organization/organization.service';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { REG_EXP_PATTERNS } from 'src/app/shared/enums/regex-pattern.enum';
import { Roles } from 'src/app/shared/enums/roles.enums';
import { UserSearchCriteria } from '../user-list/user-Interface';
import { UserService } from '../user.service';



@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {
  Users: any;
  addNewUserForm!: FormGroup;
  organizationList: any;
  organizationsData: any;
  isUserEdit : boolean = false;
  userDetails:any;

  constructor(private formBuilder: FormBuilder,
    private organizationService: OrganizationService,
    private userService: UserService,
    private alertpopupService: AlertpopupService,
    public dialogref: MatDialogRef<AddNewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public userId : string
    ) {
  }

  ngOnInit(): void {
    if(this.userId){
      this.isUserEdit = true;
      this.userDetailsById();
    }else{
      this.isUserEdit = false;
    }
    this.generateAddNewUserForm();
    this.getAllOrganization()

    this.addNewUserForm.controls['organization'].valueChanges.subscribe((res:any)=>{
      this.filterData(res);
    })

  }

  userDetailsById(){
    const userPayload : UserSearchCriteria = {
      pageNumber: 0,
      pageSize: 50,
      sortField: "",
      sortOrder: 0,
      type: "",
      isActive: true,
      role: "",
      userId: this.userId,
      user: ""
    }
    this.userService.userSearchCriteria(userPayload).subscribe((res)=>{
      console.log(res);
      this.userDetails = res.users[0].users;
      this.addNewUserForm.controls['Name'].setValue(this.userDetails[0].Name),   
      this.addNewUserForm.controls['password'].setValue(this.userDetails[0].password),
      this.addNewUserForm.controls['email'].setValue(this.userDetails[0].email),
      this.addNewUserForm.controls['organization'].setValue(this.userDetails[0].organization),
      this.addNewUserForm.controls['departmentname'].setValue(this.userDetails[0].departmentname)
      console.log(this.userDetails, "user list");
    }, (error) => {
      console.log(error);
    })
  }
  

  filterData(searchString: string) {
    let resultArray :any = [];
    const filterValue = searchString?.toLowerCase();
    this.organizationsData?.filter((option: any) =>{
      let result = option.organization.toLowerCase().includes(filterValue);
      if(result){
        resultArray.push(option);
      }
    });
    this.organizationList = resultArray;
  }

  generateAddNewUserForm() {
    this.addNewUserForm = this.formBuilder.group({
      Name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(REG_EXP_PATTERNS.PasswordPattern)]],
      email: ['', [Validators.required, Validators.pattern(REG_EXP_PATTERNS.EmailPattern)]],
      organization: ['', [Validators.required]],
      department: ['',],
    })
  }

  onSubmit() {
    const selectedOrganization = this.organizationsData.findIndex((value:  any) => value.organization == this.addNewUserForm.controls['organization'].value );
    const payload = {
      ...this.addNewUserForm.value,
      organization: [this.organizationsData[selectedOrganization]._id],
      roles: [Roles.User]
    }
    this.userService.addUser(payload).subscribe((res) => {
      this.alertpopupService.open({
        message: "User added sucessfully",
        action: "ok"
      })
    }, (error) => {
      this.alertpopupService.open({
        message: error.message ? error.message : "something went wrong!",
        action: "ok"

      });
    });


  }

  getAllOrganization() {
    this.organizationService.getAllOrganizations().subscribe((res) => {
      this.organizationsData = res.organizations;
      this.organizationList= res.organizations
    })

  }

}
