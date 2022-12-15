import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { OrganizationService } from 'src/app/organization/organization.service';
import { AlertpopupService } from 'src/app/shared/alertPopup/alertpopup.service';
import { REG_EXP_PATTERNS } from 'src/app/shared/enums/regex-pattern.enum';
import { Roles } from 'src/app/shared/enums/roles.enums';
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

  constructor(private formBuilder: FormBuilder,
    private organizationService: OrganizationService,
    private userService: UserService,
    private alertpopupService: AlertpopupService) {
  }

  ngOnInit(): void {
    this.generateAddNewUserForm();
    this.getAllOrganization()

    this.addNewUserForm.controls['organization'].valueChanges.subscribe((res:any)=>{
      this.filterData(res);
      console.log(res);
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
