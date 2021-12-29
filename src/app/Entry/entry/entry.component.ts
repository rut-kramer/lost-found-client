import { Component, OnInit } from '@angular/core';
import { SignInComponent } from '../sign-in/sign-in.component';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SignUpCompanyComponent } from '../sign-up-company/sign-up-company.component';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialogLogin(s: string): void {
    const dialogRef = this.dialog.open(SignInComponent, {
      width: '300px',
      // panelClass: 'custom-modalbox'
      //data: {name: lost.ItemName}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // אנימציה של המתנה \ התחברות
      if(result=='signUp')
      this.openDialogSignUp('m');
    });
  }  
  openDialogSignUp(s: string): void {
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '300px',
      // panelClass: 'custom-modalbox'
      //data: {name: lost.ItemName}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // אנימציה של המתנה \ התחברות
      s = result;
    });
  }
  openDialogSignUpCompany(s: string): void {
    const dialogRef = this.dialog.open(SignUpCompanyComponent, {
      width: '800px',
      // panelClass: 'custom-modalbox'
      //data: {name: lost.ItemName}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // אנימציה של המתנה \ התחברות
      s = result;
    });
  }
}
