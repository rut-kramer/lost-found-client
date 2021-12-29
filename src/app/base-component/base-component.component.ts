import { Component, OnInit } from '@angular/core';
import { User } from '../zClasses/user';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.css']
})
export class BaseComponentComponent implements OnInit {

  constructor(private u: UserService, private router: Router) {
    if (sessionStorage.user) {
      this.currentUser = JSON.parse(sessionStorage.user)
      if (this.currentUser.UserStatus == true) {
        // this.isImg=true;
        this.src = "http://localhost:50886/Images/" + this.currentUser.UserImage;
      } 
    }
  }
  currentUser: User;
  src: string;
  // isImg: boolean=false;

  click() {
    sessionStorage.clear();
    // alert('clear');
    this.router.navigateByUrl('');
  }
  clicky(num:number){
    document.getElementsByTagName("a")[num].click();
  }
  ngOnInit() {
  }

}
