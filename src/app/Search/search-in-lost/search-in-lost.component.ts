import { Component, OnInit } from '@angular/core';
import { Category } from '../../zClasses/Category';
import { DataService } from '../../Services/data.service';
import { Router } from '@angular/router';
import { Lost } from '../../zClasses/Lost';
import { LatLngLiteral } from '@agm/core';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { TransportationService } from 'src/app/Services/transportation.service';
import { Route } from 'src/app/zClasses/Route';
import { Agency } from 'src/app/zClasses/Agency';
import { User } from 'src/app/zClasses/user';
import { SearchesService } from 'src/app/Services/searches.service';

@Component({
  selector: 'app-search-in-lost',
  templateUrl: './search-in-lost.component.html',
  styleUrls: ['./search-in-lost.component.css']
})
export class SearchInLostComponent implements OnInit {
  categories: Category[];
  CategorySelected: Category;
  selectLocation: LatLngLiteral={lat:0,lng:0};
  Radius: number = 0;
  //LocationId:Number=0;
  BusRoutes: Route[];
  Agencies: Agency[];
  selectedBus: string;
  companyLocation: LatLngLiteral = { lat: 0, lng: 0 };
  currentUser: User;
  companies: User[];

  constructor(data: DataService, private searchS: SearchesService, private router: Router, private transportation: TransportationService) {
    this.categories = data.Categories;
    this.companies = data.Companies;
    this.BusRoutes = transportation.BusRoutes;
    this.Agencies = transportation.Agencies;
    console.log(this.categories);
    debugger
  }
  SelectedCategory(event: Category) {
    this.CategorySelected = event;
    console.log(this.CategorySelected);
  }
  selectedLocation(event: string[]) {
    debugger
    this.selectLocation.lat = +event[0];
    this.selectLocation.lng = +event[1];
    // alert(this.selectLocation.lat+" "+this.selectLocation.lng+" "+event[2]);
    console.log(this.selectLocation);
  }
  //SuitableLosts:Lost[];
  Search() {
    debugger
    // alert("מי שלח לפה????");

    this.searchS.UniversalSearchInLosts(this.CategorySelected.CategoryId, this.selectLocation.lat, this.selectLocation.lng, this.Radius)
    // this.router.navigateByUrl('base/result/' + this.CategorySelected.CategoryId + '/' + this.selectLocation.lat + '/' + this.selectLocation.lng + '/' + this.Radius);
  }

  selectedRadius(event: number) {
    this.Radius = event;
    console.log(this.Radius, 'in-lost radius');
  }
  selectedBusRoutes(event: number) {
    this.BusRoutes[0].BusNumber
    this.BusRoutes[0].Agency.Name
  }
  filteredOptions: Route[];
  busControl = new FormControl();
  ngOnInit() {
    this.currentUser = JSON.parse(sessionStorage.user)
    debugger
    if (this.currentUser.UserStatus == true) {
      debugger
      this.companyLocation.lat = this.currentUser.UserLat
      this.companyLocation.lng = this.currentUser.UserLng
    }

    this.filteredOptions = this.BusRoutes;
    document.getElementById("defaultOpen").click();
    // this.filteredOptions=this.busControl.valueChanges.pipe(
    //   startWith(''),
    //   // map(value=>this._filter(value))
    // );
  }



  //   private _filter(value: String): string[] {
  //     const filterValue = value.toLowerCase();
  //     return this.busses.filter(option => option.BusName.toLowerCase().includes(filterValue));
  // }
  BusSelected(event: any) { }
  //   let materialSelectedName=event.option.value;
  //     //let i=(Number)((event.option as HTMLSelectElement).value);
  //     console.log(materialSelectedName);
  //     let Selected:Bus=(this.busses.find(x=>x.BusName==materialSelectedName));
  //     this.selectedBus=Selected.MaterialId;
  //     if(Selected==null)
  //     {
  //       alert("this category isn't exist. you can change it to another");
  //     }
  //     console.log(this.CategorySelected);
  //   }



  openCity(event: any, cityName: string) {
    debugger
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
      // tablinks[i].className = tablinks[i].className.replace(" w3-border-red", "");
    }
    document.getElementById(cityName).style.display = "block";
    event.currentTarget.className += " active";
    // event.currentTarget.firstElementChild.className += " w3-border-red";


  }
}
