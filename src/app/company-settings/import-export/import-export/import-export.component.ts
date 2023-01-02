import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
interface Organizations {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.scss']
})
export class ImportExportComponent implements OnInit {

 

  ngOnInit(): void {
  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder) {}
  organizations: Organizations[] = [
    {value: 'DECAS', viewValue: 'DECAS(0)'},
    {value: 'TestingAssociation001-1', viewValue: 'TestingAssociation001'},
    {value: 'Prasad Org-2', viewValue: 'Prasad Org(0)'},
  ];
}
