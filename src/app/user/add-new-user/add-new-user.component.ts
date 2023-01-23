import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationService } from 'src/app/organization/organization.service';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { REG_EXP_PATTERNS } from 'src/app/shared/enums/regex-pattern.enum';
import { Roles } from 'src/app/shared/enums/roles.enums';
import { SearchPipe } from 'src/app/shared/pipes/search.pipe';
import { SelectedOrganizationService } from 'src/app/shared/services/selected-organizions/selected-organization.service';
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
  organizationList: any=[{organization:""}];
  organizationsData: any;
  isUserEdit: boolean = false;
  userDetails: any;
  searchedOrganizationList: any = [];
  selectOrganization: any;

  constructor(private formBuilder: FormBuilder,
    private organizationService: OrganizationService,
    private userService: UserService,
    private alertpopupService: AlertpopupService,
    public dialogref: MatDialogRef<AddNewUserComponent>,     
    @Inject(MAT_DIALOG_DATA) public userId: string,
    private selectedOrganizationService: SelectedOrganizationService
  ) {
  }

  ngOnInit(): void {
    if (this.userId) {
      this.isUserEdit = true;
      this.userDetailsById();
    } else {
      this.isUserEdit = false;
    }
    this.generateAddNewUserForm();
    this.getAllOrganization()
    this.addNewUserForm.controls['organization'].valueChanges.subscribe((res:any)=>{
      this.filterData(res);
    })
    
  }

  userDetailsById() {
    const userPayload: UserSearchCriteria = {
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
    this.userService.userSearchCriteria(userPayload).subscribe((res) => {
      this.userDetails = res.data.users;
      this.addNewUserForm.controls['Name'].setValue(this.userDetails[0].Name),
        this.addNewUserForm.controls['email'].setValue(this.userDetails[0].email),
        this.addNewUserForm.controls['organization'].setValue(this.userDetails[0].organization),
        this.addNewUserForm.controls['department']?.setValue(this.userDetails[0].department)
    }, (error) => {
      console.log(error);
    })
  }


  filterData(searchString: string) {
    if(!searchString){
      return;
    }
    this.organizationList = this.organizationsData;
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
    if (this.userId) {
      let payload : any = {
        Name: this.addNewUserForm.value.Name,
        userAttributes: {},
        organization: this.addNewUserForm.value.organization,
        isActive: true,
        department: this.addNewUserForm.value.department,
        email:this.addNewUserForm.value.email,
      }
      if(this.addNewUserForm.value.password){
        payload = {...payload,password : this.addNewUserForm.value.password}
      }

      this.userService.updateUser(this.userId, payload).subscribe((res) => {
        if (res.success) {
          this.alertpopupService.open({
            message: res.message,
            action: "ok"
          })
        }
      }, (error) => {
        this.alertpopupService.open({
          message: error.message ? error.message : "something went wrong!",
          action: "ok"

        });
      })
    }
    else {
      const payload = {
        ...this.addNewUserForm.value,
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
  }

  getAllOrganization() {
    this.organizationService.getAllOrganizations().subscribe((res) => {
      this.organizationsData = res;
      this.organizationList = res.organizations;
      this.searchedOrganizationList = res.organizations

    })
  }


  filterOrganization(event: any) {
    if (event.target.value) {
      const search = new SearchPipe();
      this.searchedOrganizationList = search.transform(this.organizationList, event.target.value, 'organization');
    } else {
      this.organizationList;
    }
  }
}
