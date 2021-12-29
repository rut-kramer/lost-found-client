import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/zClasses/user';

@Component({
  selector: 'app-opening-search',
  templateUrl: './opening-search.component.html',
  styleUrls: ['./opening-search.component.css']
})
export class OpeningSearchComponent implements OnInit {
  currentUser:User
  constructor(public router: Router) { 
    if (sessionStorage.user) 
      this.currentUser = JSON.parse(sessionStorage.user)
      

  }
  navi(to: string) {
    if (to == 'inlost')
      this.router.navigateByUrl('base/search/searchInLos');
    else
      if (to == 'infound')
        this.router.navigateByUrl('base/search/searchInFoun');
  }
  ngOnInit(): void {
  }

}
