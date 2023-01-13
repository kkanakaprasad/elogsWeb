import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { CompanySettingsService } from '../company-settings/company-settings.service';
import { SearchPipe } from '../shared/pipes/search.pipe';
import { SelectedOrganizationService } from '../shared/services/selected-organizions/selected-organization.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  
  //Reference Variable //variable Name //Type
 

  constructor() { }

  ngOnInit(): void {
   
  }


  

}
