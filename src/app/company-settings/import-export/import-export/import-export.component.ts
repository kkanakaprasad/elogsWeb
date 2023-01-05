import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CompanySettingsService } from '../../company-settings.service';
import * as XLSX from 'xlsx'; 
import { ReadVarExpr } from '@angular/compiler';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  title: string;
  description: string;
  duedate: number;
  status: string;
  type: string;
  assignedto: string;
}

//const ELEMENT_DATA: PeriodicElement[] =[]
// = [
//   {si: 1, title: '1', description: 'Hydrogen', duedate: 1.0079, status: 'H', type: '', assignedto: ''},
//   {si: 1, title: '2', description: 'Helium', duedate: 4.0026, status: 'He', type: '', assignedto: ''},
//   {si: 1, title: '3', description: 'Lithium', duedate: 6.941, status: 'Li', type: '', assignedto: ''},
//   {si: 1, title: '4', description: 'Beryllium', duedate: 9.0122, status: 'Be', type: '', assignedto: ''},
//   {si: 1, title: '5', description: 'Boron', duedate: 10.811, status: 'B', type: '', assignedto: ''},
//   {si: 1, title: '6', description: 'Carbon', duedate: 12.0107, status: 'C', type: '', assignedto: ''},
//   {si: 1, title: '7', description: 'Nitrogen', duedate: 14.0067, status: 'N', type: '', assignedto: ''},
//   {si: 1, title: '8', description: 'Oxygen', duedate: 15.9994, status: 'O', type: '', assignedto: ''},
//   {si: 1, title: '9', description: 'Fluorine', duedate: 18.9984, status: 'F', type: '', assignedto: ''},
//   {si: 1, title: '10', description: 'Neon', duedate: 20.1797, status: 'Ne', type: '', assignedto: ''},
// ];

// const csvFile: any[] | undefined =[];
@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.scss']
})
export class ImportExportComponent implements OnInit {
csvFile: any = [];
organizationsList = [] as any;
displayedColumns: string[] = ['title', 'description', 'duedate', 'status', 'type', 'assignedto'];
dataSource = new MatTableDataSource(this.csvFile);


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

uploadCsvFile(event: any) {
  /* wire up file reader */
  const target: DataTransfer = <DataTransfer>(event.target);
  if (target.files.length !== 1) {
    throw new Error('Cannot use multiple files');
  }
  const reader: FileReader = new FileReader();
  reader.readAsBinaryString(target.files[0]);
  reader.onload = (e: any) => {
    /* create workbook */
    const binarystr: string = e.target.result;
    const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

    /* selected the first sheet */
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];

    /* save data */
     this.csvFile = XLSX.utils.sheet_to_json(ws); 
     this.dataSource = new MatTableDataSource(this.csvFile);// to get 2d array pass 2nd parameter as object {header: 1}
    console.log(this.csvFile); // Data will be logged in array format containing objects
  };
}
}
