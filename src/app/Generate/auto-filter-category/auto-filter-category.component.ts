import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Category } from '../../zClasses/Category';
import { DataService } from '../../Services/data.service';
import { Observable } from 'rxjs';
import { map, startWith} from 'rxjs/operators';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@Component({
  selector: 'app-auto-filter-category',
  templateUrl: './auto-filter-category.component.html',
  styleUrls: ['./auto-filter-category.component.css']
})
export class AutoFilterCategoryComponent implements OnInit {

  @Output() CategorySelected:EventEmitter<Category> = new EventEmitter();
  categoryControl=new FormControl();
  aa:boolean=true;
  options:Category[] = [];
  filteredOptions: Observable<Category[]>;
  // options:String[] = [];
  // filteredOptions: Observable<String[]>;
  constructor(private data:DataService) {
    data.data.Categories.subscribe(categories => this.options=categories);
    //data.data.Categories.subscribe(categories => this.options.push(...categories.map(c => c.CategoryName)))
   }

  ngOnInit() {
    this.filteredOptions=this.categoryControl.valueChanges.pipe(
      startWith(''),
      map(value=>this._filter(value))
    );
  }

    SelectedCategory(event:any){
      let categorySelectedName=event.option.value;
        //let i=(Number)((event.option as HTMLSelectElement).value);
        console.log(categorySelectedName);
        let category:Category= this.options.find(x=>x.CategoryName==categorySelectedName);
        this.CategorySelected.emit(category);
        if(category==null)
        {
          alert("this category isn't exist. you can change it to another");
        }
        console.log(this.CategorySelected,'eventemitter קטגורי');
      }

  private _filter(value: String): Category[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.CategoryName.toLowerCase().includes(filterValue));
}
}
