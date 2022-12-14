import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { MaterialModule } from './shared/Modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './login-page/login.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { OrganizationModule } from './organization/organization.module';
import { AddNewUserComponent } from './user/add-new-user/add-new-user.component';


@NgModule({
  declarations: [ 
    AppComponent,
    HomeComponent,
    MainComponent,
    LoginComponent,
    HeaderComponent,
    SideNavComponent,
    AddNewUserComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    OrganizationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
