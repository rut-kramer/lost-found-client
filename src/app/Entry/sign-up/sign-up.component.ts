import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { User } from '../../zClasses/user';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  newUser: User = { UserId: 0, UserName: '', UserMail: '', UserPassword: '', UserAddress: '', UserImage: '', UserMobile: '', UserStatus: false ,UserLng:0,UserLat:0};
  isSpinner: boolean = false;
  constructor(private u: UserService, public dialogRef: MatDialogRef<SignUpComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  email = new FormControl('', [Validators.required, Validators.email]);
getErrorMessage() {
  if (this.email.hasError('required')) {
    return '*שדה חובה';
  }
  return this.email.hasError('email') ? 'מייל לא תקין' : '';
}


  signUp() {
    if (this.newUser.UserPassword != (<HTMLInputElement>document.getElementById("trueUserPassword")).value) {
      alert("אימות הסיסמא נכשל");
    }
    else
    if(this.newUser.UserPassword.length<4)
    alert(" סיסמא פחות מ-4 תוים קצרה מידי ");
    else{
      // this.getErrorMessage();

    // if(this.newUser.UserMail.)}
      this.isSpinner = true;
      this.addUser();
  }
    // else {

    }
  addUser() {
    // this.getErrorMessage();
    // alert()
    this.u.addUser(this.newUser).subscribe(x => {
      if (x != 0) {
        // this.currentUser =;\
        this.newUser.UserId=x as number;
        sessionStorage.user = JSON.stringify(this.newUser);
        this.onNoClick();
        this.isSpinner = false;
        // alert(this.newUser.UserMail + 'לשים בוטסטרפ אלרט בדף הבא עם X');
        this.u.entryNavigation();
      }
      else {
        this.isSpinner = false;
        alert("this user exist.try another user.");
      }
    });;

  }

  ngOnInit() {
  }

}
