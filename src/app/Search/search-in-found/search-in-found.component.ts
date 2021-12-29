import { Component, OnInit } from '@angular/core';
import { Category } from '../../zClasses/Category';
import { DataService } from '../../Services/data.service';
import { Router } from '@angular/router';
import { Lost } from '../../zClasses/Lost';
import { User } from 'src/app/zClasses/user';
import { LatLngLiteral } from '@agm/core';
import { SearchesService } from 'src/app/Services/searches.service';

@Component({
  selector: 'app-search-in-found',
  templateUrl: './search-in-found.component.html',
  styleUrls: ['./search-in-found.component.css']
})
export class SearchInFoundComponent implements OnInit {
  categories: Category[];
  CategorySelected: Category;
  selectLocation: LatLngLiteral={lng:0,lat:0};
  Radius: number = 0;
  companies: User[];

  constructor(data: DataService, private searchS:SearchesService, private router: Router) {
    this.categories = data.Categories;
    this.companies = data.Companies;
    console.log(this.categories);
  }

  SelectedCategory(event: Category) {
    this.CategorySelected = event;
    console.log(this.CategorySelected);
  }
  //SuitableLosts:Lost[];
  selectedLocation(event: string[]) {
    this.selectLocation.lat = +event[0];
    this.selectLocation.lng = +event[1];
    console.log(this.selectLocation);
  }
  selectedRadius(event: number) {
    this.Radius = event;
    console.log(this.Radius, 'in-lost radius');
  }
  Search() {
    // alert("טעוןת");  /////////////
    this.searchS.UniversalSearchInFounds( this.CategorySelected.CategoryId ,this.selectLocation.lat,this.selectLocation.lng ,this.Radius)
    // this.router.navigateByUrl('base/result/' + this.CategorySelected.CategoryId + '/' + this.selectLocation.lat + '/' + this.selectLocation.lng + '/' + this.Radius);
    // Save(){
    //   this.search.SaveFound(this.found);
    // }

    // {this.router.navigateByUrl('base/result/'+this.CategorySelected.CategoryId+'/'+this.selectLocation.lat+'/'+this.selectLocation.lng+'/'+this.Radius);
    // this.router.navigateByUrl('base/result/'+this.CategorySelected.CategoryId+'/'+this.LocationId+'/'+this.Radius);
    // this.router.navigateByUrl('base/result/{categorySelectedId}/{locationId}/{radius}',{queryParams:{
    //   categorySelectedId:this.CategorySelectedId,
    //   locationId:this.LocationId,
    //   radius:this.Radius
    // }});}
    }

    ngOnInit() {
    }

  }