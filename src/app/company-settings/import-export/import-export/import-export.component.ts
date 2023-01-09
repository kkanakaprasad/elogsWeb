import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CompanySettingsService } from '../../company-settings.service';
import * as XLSX from 'xlsx';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelect } from '@angular/material/select';


@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.scss']
})
export class ImportExportComponent implements OnInit, AfterViewInit {
  csvFile: any = [] as any;
  organizationsList = [] as any;
  displayedColumns: string[] = ['Title', 'Description', 'Due Date', 'Status', 'Type', 'Assigned To'];
  dataSource = new MatTableDataSource(this.csvFile);
  selectOrganization = '';
  fileData: any



  ngOnInit(): void {
    this.getAllOrganizations()
  }
  uploadFileForm = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  priviewDataForm = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  constructor(private _formBuilder: FormBuilder, private companySettingsService: CompanySettingsService) { }

  getAllOrganizations() {
    this.companySettingsService.getAllOrganizations().subscribe((res) => {
      this.organizationsList = res.organizations
    })
  }

  // read data from Exel

  uploadCsvFile(event: any) {
    const target: DataTransfer = <DataTransfer>(event.target);
    this.fileData = event.target.files    
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {

      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.csvFile = XLSX.utils.sheet_to_json(ws);
      this.dataSource = new MatTableDataSource(this.csvFile);
    };
  }

  exportTasksPopup() {
    this.companySettingsService.exportTasksPopup().afterClosed().subscribe((res) => {
      if (res) {

      }
    })
  }

  @ViewChild('matSelect') matSelect!: MatSelect;
  //Reference Variable //variable Name //Type

  ngAfterViewInit() {
    this.matSelect.valueChange.subscribe((selectValue: any) => {
      this.selectOrganization = selectValue;
    });
  }

  filterOrganization(event:any) {
    const searchText = event.target.value;

    this.organizationsList = this.organizationsList.filter((org: any) => {
      return org.organization.toLowerCase().indexOf(searchText.toLowerCase()) > -1
    });
  }
}
