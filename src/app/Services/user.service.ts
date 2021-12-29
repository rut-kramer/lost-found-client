import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';
import { User } from '../zClasses/user';
import { EmailValidator } from '@angular/forms';
import { Item } from '../zClasses/Item';
import { Lost } from '../zClasses/Lost';
import { BehaviorSubject, Observable } from 'rxjs';
import { Found } from '../zClasses/Found';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) {
    debugger
    if (sessionStorage.user) {
      this.currentUser = JSON.parse(sessionStorage.user);
    }
  }
  public userLosts = {
    SuitableLosts: new BehaviorSubject<Lost[]>([])
  }
  public userFounds = {
    SuitableFounds: new BehaviorSubject<Found[]>([])
  }

  entryUser(mail: string, password: string): Observable<Object> {
    return this.http.get('/api/User/', { params: { userMail: mail, userPassword: password } })
  }
  currentUser: User;
  entryNavigation() {
    this.router.navigateByUrl('/base');
  }


  postFile(image: File): Observable<string> {
    if (image!=null)
     {
    const formData: FormData = new FormData();
    formData.append('Image', image, image.name);
    // alert(formData.get(&#39;image&#39;).toString());
    return this.http.post<string>('api/User/UploadLogo', formData);}
    return null;
  }

  addUser(u: User): Observable<Object> {
    // debugger
    // ,image: File
    // if (image!=null)
    // {
    // const formData: FormData = new FormData();
    // formData.append('Image', image, image.name);
    // // alert(formData.get(&#39;image&#39;).toString());
    //  this.http.post<string>('api/User/UploadLogo', formData);
    //  u.UserImage=image.name;
    // }
    return this.http.post('/api/User', u);
  }

  GetUserLosts() {
    debugger
    let userId: number = this.currentUser.UserId;
    console.log("Get User Losts");
    // userId=10003;
    this.http.get('/api/User/GetUserLosts/', { params: { userId: userId.toString() } }).subscribe(x => {
    debugger;
      let SuitLosts: Lost[] = x as Lost[];
      let empty: Lost[] =[];
      this.userLosts.SuitableLosts.next(empty);
      this.userLosts.SuitableLosts.next(SuitLosts);
    });
  }

  GetUserFounds() {
    let userId: number = this.currentUser.UserId;
    console.log("Get User Founds");
    // userId=10003;
    this.http.get('/api/User/GetUserFounds/', { params: { userId: userId.toString() } }).subscribe(x => {
      let SuitFounds: Found[] = x as Found[];
      this.userFounds.SuitableFounds.next(SuitFounds);
    });
  }

}

// canActivate(route: ActivatedRoute, snapshot: RouterStateSnapshot ) {

  // }

  // entryUser(mail:string,password:string): boolean
  // {
  //    this.http.get('/api/User/',{params:{userMail:mail,userPassword:password}}).subscribe(x=>{
  //      this.currentUser=x as User;
  //      sessionStorage.user = JSON.stringify(x);
  //     if(this.currentUser!=null){
  //       alert(this.currentUser.UserMail);
  //       // !!אולי במקום לנתב לדף אחר נמחק את הקישורים של כניסה והרשמה ונכתוב את שם המשתמש---בוצע
  //       this.router.navigateByUrl('/base');
  //       return true;
  //     }
  //     else {
  //       alert("You dont found!"); 
  //       this.router.navigateByUrl('/signUp');
  //       return true;
  //     }
  //   });
  //   return true;
  // }


 // addUser(u: User): Observable<Object> {
  //   debugger;
  //   return this.http.post('/api/User', u);
    // .subscribe(x => {
    //   if (x == true) {
    //     this.currentUser = u;
    //     sessionStorage.user = JSON.stringify(u);
    //     //  alert("signUp sucsses");
    //     // אולי במקום לנתב לדף אחר נמחק את הקישורים של כניסה והרשמה ונכתוב את שם המשתמש
    //     this.router.navigateByUrl('/base');
    //   }
    //   else {
    //     alert("this user exist.try another user.");
    //     this.router.navigateByUrl('/signUp');
    //   }
    // });
