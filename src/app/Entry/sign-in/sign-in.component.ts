import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { DataService } from '../../Services/data.service';
import { EmailValidator, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/zClasses/user';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  userMail: string;
  userPassword: string;
  isSpinner: boolean = false;
  constructor(private u: UserService, public dialogRef: MatDialogRef<SignInComponent>) { }

  ngOnInit() {
  }
  signIn() {
    this.isSpinner = true;
    this.entryUser()
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  currentUser: User;
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return '*שדה חובה';
    }
    return this.email.hasError('email') ? 'מייל לא תקין' : '';
  }
  entryUser() {
    this.u.entryUser(this.userMail, this.userPassword).subscribe(x => {
      this.currentUser = x as User;
      debugger;
      sessionStorage.user = JSON.stringify(x);
      if (this.currentUser != null) {
        this.onNoClick();
        // debugger
        this.isSpinner = false;
        // alert(this.currentUser.UserMail + 'לשים בוטסטרפ אלרט בדף הבא עם X');
        this.u.entryNavigation();
      }
      else {
        alert("משתמש לא מזוהה");
        this.dialogRef.close('signUp');
        // this.router.navigateByUrl('/signUp');
      }
    });
  }
}
