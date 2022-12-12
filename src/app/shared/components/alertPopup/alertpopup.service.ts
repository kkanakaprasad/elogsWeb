import { Injectable } from '@angular/core';
import { ISankbarInterface } from './alertPopup.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertpopupService {
  constructor(public sankbar:MatSnackBar) { }
  open(data:ISankbarInterface){
    const ref=this.sankbar.open(data.message,data.action, {
      horizontalPosition:'end',
      verticalPosition:'top',
      duration:3*1000})
  }
}
