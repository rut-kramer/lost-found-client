import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/zClasses/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private routerActivate: ActivatedRoute) {
    this.comp = this.routerActivate.snapshot.params.comp;

  }
  comp: string;
  currentUser: User;
  ngOnInit(): void {
    // !!!!!!!!!!!!!!!mapssssssssssss to drag end!!!!!!!!
    // Get the element with id="defaultOpen" and click on it
    this.currentUser = JSON.parse(sessionStorage.user);
    this.openNav();
    // let num: number = 10;
    // if (this.currentUser.UserStatus)
    //   num -= 2;
    if (this.comp == "searchInFoun")
      document.getElementById("s1").click();
    else
      if (this.comp == "saveLos")
      document.getElementById("s2").click();
      else
        if (this.comp == "searchInLos")
        document.getElementById("s3").click();
        else
          if (this.comp == "saveFoun")
          document.getElementById("s4").click();

    // document.getElementById("defaultOpen").click();

  }
  searchInFound = "searchInFound"
  openCity(event: any) {
    let i, tabcontent, tablinks;
    // , cityName: string
    tablinks = document.getElementsByTagName("a");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
    }
    // document.getElementById(cityName).style.display = "block";
    event.currentTarget.className += "active";
  }




  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main1").style.marginRight = "250px";
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main1").style.marginLeft = "0";
  }



}
