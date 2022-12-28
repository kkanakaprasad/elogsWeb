import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OrganizationModule } from "../organization/organization.module";
import { RemoveOrgPopUpComponent } from './user-list/remove-org-pop-up/remove-org-pop-up.component';



@NgModule({
    declarations: [
        AddNewUserComponent,
        UserListComponent,
        RemoveOrgPopUpComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        UserRoutingModule,
        SharedModule,
        OrganizationModule
    ]
})
export class UserModule { }
