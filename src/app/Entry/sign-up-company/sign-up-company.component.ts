import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/user.service';
import { User } from '../../zClasses/user';
import { MatDialogRef } from '@angular/material/dialog';
import { LatLngLiteral } from '@agm/core';


@Component({
  selector: 'app-sign-up-company',
  templateUrl: './sign-up-company.component.html',
  styleUrls: ['./sign-up-company.component.css']
})
export class SignUpCompanyComponent implements OnInit {
  newUser: User = { UserId: 0, UserName: '', UserMail: '', UserPassword: '', UserAddress: '', UserImage: '', UserMobile: '', UserStatus: true ,UserLat:0,UserLng:0};
  // Entry/sign-up-company/dunuyu.jpg
  isSpinner: boolean = false;
  fileToUpLoad: File;
  // selectLocation:LatLngLiteral={lat:0,lng:0};

  constructor(private u: UserService, public dialogRef: MatDialogRef<SignUpCompanyComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  // selectedLocation(event:LatLngLiteral){
  //   this.selectLocation=event;
  //   this.newUser.UserLat=this.selectLocation.lat;
  //   this.newUser.UserLng=this.selectLocation.lng;
    
  //   console.log(this.selectLocation);
  // }
  selectedLocation(event:string[]){
    this.newUser.UserLat=+event[0];
    this.newUser.UserLng=+event[1];
    this.newUser.UserAddress=event[2];
    console.log(this.newUser);
  }
  selectedRadius(event:number)
  {}

  signUpCompany() {
    if (this.newUser.UserPassword != (<HTMLInputElement>document.getElementById("trueCompanyUserPassword")).value) {
      alert("אימות הסיסמא נכשל");
    }
    else {
      //   this.u.addUser(this.newUser);
      //   this.onNoClick();
      //   }
      // }
      debugger
      this.isSpinner = true;
      this.addUser();
    }
  }
  previous(){
    document.getElementById("page1").style.transform =  "translate(0px)";
    document.getElementById("page1").style.transform += "rotateY(0)";
    document.getElementById("page2").style.transform =  "translate(-27vw)";
    document.getElementById("page2").style.transform += "rotateY(90deg)";

  }
  next() {

 
    document.getElementById("page1").style.transform =  "translate(30vw)";
    document.getElementById("page1").style.transform += "rotateY(90deg)"  ;

     document.getElementById("page2").style.transform =  "translate(0px)";
    document.getElementById("page2").style.transform += "rotateY(0)";
    
  //   setTimeout(function () {
  //         //  document.getElementById("page1").style.display = "none";

  // }, 1500)
    // let page1: HTMLElement = document.getElementById("page1");
    // document.getElementById("page2").style.top =document.getElementById("page1").offsetTop + "px";
        // document.getElementById("page2").style.width = page1.style.width + "px";
    // document.getElementById("page2").style.height = page1.style.height + "px";



  }
  addUser() {
    this.newUser.UserImage = this.fileToUpLoad.name;
    this.u.addUser(this.newUser).subscribe(x => {
      debugger
      this.u.postFile(this.fileToUpLoad).subscribe(y => {
        if (x == true) {
          // this.currentUser =;
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
      })
    });;

  }
  readUrl(event: any) {
    let file: FileList = event.target.files;
    if (file.item(0) != null)
      this.fileToUpLoad = file.item(0);


    this.newUser.UserImage = "";
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.newUser.UserImage = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  ngOnInit() {
    document.getElementById("page2").style.transform = "rotateY(0)";
    document.getElementById("page2").style.transform =  "translate(-25vw)";
    document.getElementById("page2").style.transform += "rotateY(90deg)";
    document.getElementById("page2").hidden =  false;

    // let page1: HTMLElement = document.getElementById("page1");
    // document.getElementById("page2").style.top = page1.offsetTop + "px";
    // document.getElementById("page2").style.left = page1.offsetLeft-200 + "px";
    // document.getElementById("page1").style.transform = "rotateY(0)";
    // document.getElementById("page2").style.width = "100%";
    // document.getElementById("page2").style.height = "100%";
    // document.getElementById("page2").style.width = page1.style.width + "px";
    // document.getElementById("page2").style.height = page1.style.height + "px";
  }
  /*
  ...
  constructor(...) {...}
  ...
  
  } */
}
