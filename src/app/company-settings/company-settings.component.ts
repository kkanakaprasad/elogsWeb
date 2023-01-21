import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertpopupService } from '../shared/alertPopup/alertpopup.service';
import { EventCommunicationsService } from '../shared/services/event-communications.service';
import { CompanySettingsService } from './company-settings.service';
import { ImportExportComponent } from './import-export/import-export/import-export.component';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.scss']
})
export class CompanySettingsComponent implements OnInit {

  companySettingsForm!: FormGroup;
  companySettingsData: any;
  constructor(private formBuilder: FormBuilder,
    private alertpopupService: AlertpopupService,
    private eventCommunicationsService: EventCommunicationsService,
    private companySettingsService: CompanySettingsService) {
  }

  ngOnInit(): void {
    this.generateNewCompanySettingsForm();
    this.getCompanySettings();
  }

  generateNewCompanySettingsForm() {
    this.companySettingsForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      isActive: ['', [Validators.required]],
    })
  }

  getCompanySettings() {
    this.companySettingsService.getCompanySettings().subscribe((res) => {
      this.companySettingsData = res;
      this.companySettingsForm.controls['name'].setValue(this.companySettingsData.companySettings[0].name)
    });  
  }

  onUpdate() {
    let payload: any = {
      name: this.companySettingsForm.value.name,
      isActive: true
    }
    this.companySettingsService.updateCompanySettings(this.companySettingsData.companySettings[0]._id, payload).subscribe((res) => {
      if (res.success) {
        this.eventCommunicationsService.broadcast("RELOAD_NAME",res.companySettings.name );
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

}
