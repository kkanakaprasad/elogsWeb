import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CompanySettingsService } from '../../company-settings.service';


@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.scss']
})
export class ImportExportComponent implements OnInit {
public organizationsList = [] as any;
 

  ngOnInit(): void {
    this.getAllOrganizations ()
  }
  uploadFileForm = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  priviewDataForm = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder, private companySettingsService: CompanySettingsService) {}
  
  getAllOrganizations () {
    this.companySettingsService.getAllOrganizations().subscribe((res) => {
      this.organizationsList = res.organizations
      console.log(this.organizationsList)
    })   
  }
}
