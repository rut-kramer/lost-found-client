
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DataService } from '../../Services/data.service';
import { Observable } from 'rxjs';
import { map, startWith, filter } from 'rxjs/operators';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Item } from '../../zClasses/Item';

@Component({
  selector: 'app-auto-filter-item',
  templateUrl: './auto-filter-item.component.html',
  styleUrls: ['./auto-filter-item.component.css']
})
export class AutoFilterItemComponent implements OnInit {

  itemControl = new FormControl();
  // options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<Item[]>;

  @Output() ItemSelected: EventEmitter<Item> = new EventEmitter();
  // @Input() ItemsToView: Item[];
  options: Item[] = [];
  constructor(private data: DataService) {
    data.data.Items.subscribe(items => this.options = items);
  }

  ngOnInit() {

    this.filteredOptions = this.itemControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  RefreshItemsToView(ItemsToView: Item[]) {
    this.options = ItemsToView;
    this.filteredOptions = this.itemControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }
  SelectedItem(event: any) {
    let itemSelectedName = event.option.value;
    let item:Item=this.options.find(x => x.ItemName == itemSelectedName);
    this.ItemSelected.emit(item);
    if (item == null) {
      alert("this item isn't exist. you can change it to another");
    }
     console.log(this.ItemSelected);
  }

  private _filter(value: string): Item[] {
    let filterValue: string = value;
    if (value != null)
      filterValue = filterValue.toLowerCase();
    // return this.options.filter(option => option.ItemName == null || option.ItemName.toLowerCase().indexOf(filterValue) > -1)
    return this.options.filter(option => option.ItemName.toLowerCase().includes(filterValue));
  }
}

