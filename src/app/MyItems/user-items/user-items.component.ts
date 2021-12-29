import { Component, OnInit } from '@angular/core';
import { Lost } from 'src/app/zClasses/Lost';
import { User } from 'src/app/zClasses/user';
import { UserService } from 'src/app/Services/user.service';
import { DataService } from 'src/app/Services/data.service';
import { Found } from 'src/app/zClasses/Found';
import { SearchesService } from 'src/app/Services/searches.service';
import { Router } from '@angular/router';
//import { UserService } from 'src/‏‏app - עותק/user.service';

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.css']
})
export class UserItemsComponent implements OnInit {
  losts: Lost[] = [];
  lostsCategoriesName: String[] = [];
  lostsItemsName: String[] = [];

  founds: Found[] = [];
  foundsCategoriesName: String[] = [];
  foundsItemsName: String[] = [];
  constructor(public userSer: UserService, public data: DataService, private searchS: SearchesService, private router: Router) {
    this.getLost();
    this.getFounds();
  }

  getLost() {
    this.userSer.GetUserLosts();
    this.userSer.userLosts.SuitableLosts.subscribe(x => {
      debugger
      this.losts = [];
      this.losts.push(...x as Lost[]);
      // console.log(this.losts, 'פריטי משתמש זהזה');
      debugger
      // מציאת שם הקטגוריה של האבידה
      this.losts.forEach(x => this.lostsCategoriesName.push(this.data.data.Categories.value.find(y => y.CategoryId == x.CategoryId).CategoryName))
      // console.log(this.lostsCategoriesName)

      // מציאת שם הפריט של האבידה
      this.losts.forEach(x => this.lostsItemsName.push(this.data.data.Items.value.find(y => y.ItemId == x.ItemId).ItemName))
      // console.log(this.lostsItemsName)
    });
  }

  getFounds() {
    this.userSer.GetUserFounds();
    this.userSer.userFounds.SuitableFounds.subscribe(x => {
      debugger
      this.founds = [];
      this.founds.push(...x as Found[]);
      // console.log(this.founds, 'פריטי משתמש זהזה');

      // מציאת שם הקטגוריה של המציאה
      this.founds.forEach(x => this.foundsCategoriesName.push(this.data.data.Categories.value.find(y => y.CategoryId == x.CategoryId).CategoryName))
      // console.log(this.foundsCategoriesName)

      // מציאת שם הפריט של המציאה
      this.founds.forEach(x => this.foundsItemsName.push(this.data.data.Items.value.find(y => y.ItemId == x.ItemId).ItemName))
      // console.log(this.foundsItemsName)
    });
  }
  SearchFound(index: number) {
    debugger
    this.searchS.SearchFound(this.founds[index]);
  }
  SearchLost(index: number) {
    debugger
    this.searchS.SearchLost(this.losts[index]);
    // this.getFounds();
  }
  DeleteFound(index: number) {
    //dialog
    this.data.DeleteFound(this.founds[index]).subscribe(t => {
    debugger
      if (t == true)
        this.getFounds();
    });
    // this.data.data.bool.subscribe(t => {
    //   if (t == true)
    //     this.getFounds();
    // })
  }
  DeleteLost(index: number) {
    //dialog
    this.data.DeleteLost(this.losts[index]).subscribe(t=>{
      debugger
      if (t == true)
    this.getLost();
    });
  }
  UpdadeFound(index: number){
    debugger
this.router.navigateByUrl('base/saveFound/'+index)
  }
  UpdadeLost(index: number){
    debugger
this.router.navigateByUrl('base/saveLost/'+index)
  }
  Statusl(index: number){
    this.data.UpdateLostStatus(this.losts[index].LostId).subscribe(t=>{
      debugger
      if (t == true)
    this.getLost();
    });
  }
  Statusf(index: number){
    this.data.UpdateFoundStatus(this.founds[index].FoundId).subscribe(t=>{
      debugger
      if (t == true)
    this.getFounds();
    });
 }
  openCity(event: any, cityName: string) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      // tablinks[i].className = tablinks[i].className.replace(" active", "");
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    // event.currentTarget.className += " active";
    event.currentTarget.className += " active";


  }
  ngOnInit() {
    setTimeout(function(){document.getElementById("defaultOpen").click();},1500); 
    this.getLost();
    this.getFounds();
  }


}
//D:\project\src\app\UserDetails\user-items