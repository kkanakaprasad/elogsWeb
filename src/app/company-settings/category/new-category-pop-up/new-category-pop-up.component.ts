import { Component, Inject, OnInit } from '@angular/core';
import {FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-new-category-pop-up',
  templateUrl: './new-category-pop-up.component.html',
  styleUrls: ['./new-category-pop-up.component.scss']
})
export class NewCategoryPopUpComponent implements OnInit {

  newCategoryForm!: FormGroup;
  

  constructor(public dialogref: MatDialogRef<NewCategoryPopUpComponent>,
    @Inject(MAT_DIALOG_DATA) public dataId: NewCategoryPopUpComponent) { }

  ngOnInit(): void {
  }

}
