import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../zClasses/Category';
import { Item } from '../../zClasses/Item';
import { DataService } from '../../Services/data.service';
import { Material } from '../../zClasses/Material';
import { UserService } from '../../Services/user.service';
import { Found } from '../../zClasses/Found';
import { AutoFilterItemComponent } from 'src/app/Generate/auto-filter-item/auto-filter-item.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Color } from 'src/app/zClasses/Color';
import { SearchesService } from 'src/app/Services/searches.service';
import { LatLngLiteral } from '@agm/core';
import { User } from 'src/app/zClasses/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-save-found',
  templateUrl: './save-found.component.html',
  styleUrls: ['./save-found.component.css']
})


export class SaveFoundComponent implements OnInit {
  categories: Category[];
  CategorySelected: Category;
  ItemsToSelectedCategory: Item[] = [];
  ItemSelected: Item;
  materials: Material[] = [];
  colors: Color[] = [];
  renderItems: boolean = false;
  oldfound: Found;
  isOld: boolean = false;
  found: Found = {
    FoundId: 0, CategoryId: 0, ItemName: '', FoundDate: new Date(), FoundDescription: '', FoundImage: '', FoundLat: 0, FoundLng: 0,
    ItemId: 0, MaterialId: 0, FoundName: '', UserId: 0, Color1: 0, Color2: 0, Color3: 0, FoundAddress: '', FoundStatus: false
  };
  founds: Found[] = []
  foundCategoryName: String
  foundItemName: String
  foundMaterialName: String
  userSelectedLocation: LatLngLiteral = { lat: 0, lng: 0 };
  companies: User[];
  radius: number;
  @ViewChild(AutoFilterItemComponent) autoItem: AutoFilterItemComponent;

  // ngAfterViewInit() {
  //   // child is set
  //   this.child.doSomething();
  // }

  constructor(private routerActivate: ActivatedRoute, private data: DataService, private u: UserService, private search: SearchesService) {
    this.categories = data.Categories;
    this.materials = data.Materials;
    this.colors = data.Colors;
    this.companies = data.Companies;
    debugger
    let user: User = JSON.parse(sessionStorage.user);
    this.found.UserId = user.UserId;
    // alert(this.found.UserId + "    dsfghj   " + u.currentUser.UserId)
    if (user.UserStatus == true) {
      this.userSelectedLocation.lat = user.UserLat
      this.userSelectedLocation.lng = user.UserLng
    }
    // vjk npv!!

  }

  SelectedCategory(event: Category) {
    this.CategorySelected = event;
    this.ItemsToCategory();
  }

  ItemsToCategory() {
    // debugger;
    this.renderItems = false;
    this.found.CategoryId = this.CategorySelected.CategoryId;
    this.ItemsToSelectedCategory = [];
    this.data.Items.forEach(x => { if (x.CategoryId == this.found.CategoryId) this.ItemsToSelectedCategory.push(x); })
    if (this.ItemsToSelectedCategory.length != 0)
      this.renderItems = true;
    else
      this.found.ItemId = 1;
    this.autoItem.RefreshItemsToView(this.ItemsToSelectedCategory);
  }
  SelectedItem(event: Item) {
    console.log("פריט", event);
    this.ItemSelected = event;
    this.found.ItemId = this.ItemSelected.ItemId;
    console.log("פריט", this.found.ItemId);
  }
  colorSelect(event: number) {
    debugger
    // this.Colors[0].ColorName=event.target.value
    if (this.found.Color1 == 0) {
      this.found.Color1 = this.colors[event].ColorId;
      document.getElementById("p1").style.backgroundColor = this.colors[event].ColorName + ""
      document.getElementById("p1").innerText = ""
    }
    else
      if (this.found.Color2 == 0) {
        this.found.Color2 = this.colors[event].ColorId;
        document.getElementById("p2").style.backgroundColor = this.colors[event].ColorName + ""
        document.getElementById("p2").innerText = ""
      }
      else
        if (this.found.Color3 == 0) {
          this.found.Color3 = this.colors[event].ColorId;
          document.getElementById("p3").style.backgroundColor = this.colors[event].ColorName + ""
          document.getElementById("p3").innerText = ""

        }
  }
  MaterialSelected(event: any) {
    let materialSelectedName = event.option.value;
    //let i=(Number)((event.option as HTMLSelectElement).value);
    console.log(materialSelectedName);
    let Selectedmaterial: Material = (this.materials.find(x => x.MaterialName == materialSelectedName));
    this.found.MaterialId = Selectedmaterial.MaterialId;
    if (Selectedmaterial == null) {
      alert("this חומר isn't exist. you can change it to another");
    }
  }
  selectedLocation(event: string[]) {
    debugger
    this.userSelectedLocation.lat = +event[0];
    this.userSelectedLocation.lng = +event[1];
    console.log(this.userSelectedLocation);
    this.found.FoundLat = this.userSelectedLocation.lat;
    this.found.FoundLng = this.userSelectedLocation.lng;
    this.found.FoundAddress = event[2];
  }
  selectedRadius(event: number) {
    this.radius = event;
    console.log(this.radius, 'in-lost radius');
  }
  Save() {
    debugger
    if (!this.isOld)
      this.search.SaveFound(this.found);
    else
      this.data.UpdateFound(this.found);
  }
  materialControl = new FormControl();

  filteredOptions: Observable<Material[]>;
  ngOnInit() {
    this.filteredOptions = this.materialControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );


    if (this.routerActivate.snapshot.params.object) {


      this.u.userFounds.SuitableFounds.subscribe(x => {
        debugger
        this.founds = [];
        this.founds.push(...x as Found[]);

        let i: number;
        i = (this.routerActivate.snapshot.params.object as number);
        //לטפל בשליחה והעברה של אובייקט לעריכה

        var dataJson = JSON.stringify(this.founds[i]);
        this.found = JSON.parse(dataJson);
        this.oldfound = JSON.parse(dataJson);
        //this.found = this.oldfound = this.founds[i];
        this.isOld = true;
        console.log("old found", this.oldfound)
        debugger

        // מציאת שם הקטגוריה של המציאה
        this.foundCategoryName = this.data.data.Categories.value.find(y => y.CategoryId == this.oldfound.CategoryId).CategoryName

        // this.renderItems = true;

        // מציאת שם הפריט של המציאה
        this.foundItemName = this.data.data.Items.value.find(y => y.ItemId == this.oldfound.ItemId).ItemName;
        // מציאת שם MaterialName של המציאה
        this.foundMaterialName = this.data.data.Materials.value.find(y => y.MaterialId == this.oldfound.MaterialId).MaterialName;
        //מיקום המפה בהתאם למציאה
        this.userSelectedLocation.lat = this.oldfound.FoundLat
        this.userSelectedLocation.lng = this.oldfound.FoundLng
        // // אם הוא רשם שם פריט?
        if (this.oldfound.ItemName == '')
          this.oldfound.ItemName = ' ';
        // this.oldfound.FoundDescription
        // this.oldfound.ItemName

        // alert("לחילופיןןןןןןןןןןןןןןן להוסיף ליד כל אחד  מט ינפוט")

        //לחילופיןןןןןןןןןןןןןןן להוסיף ליד כל אחד  מט ינפוט 
        // שהפרופרטי שלו מקושר- הוא הערך הישן, והעריכה לא מאופשר
        // יהיו 2 אוביקטים מציאה- אחד לישן ואחד לחדש

        // //הצגת/ הסתרת פריט + הבאת הפריטים התואמים
        // this.ItemsToSelectedCategory = [];
        // this.data.Items.forEach(x => { if (x.CategoryId == this.oldfound.CategoryId) this.ItemsToSelectedCategory.push(x); })
        // if (this.ItemsToSelectedCategory.length != 0)
        // this.renderItems = true;
        // this.autoItem.RefreshItemsToView(this.ItemsToSelectedCategory);  
        //
        // debugger
        // debugger


        // document.getElementsByTagName("input")[0].value = "fghj";




      });

    }
    document.getElementById("textArea").click();

  }



  private _filter(value: String): Material[] {
    const filterValue = value.toLowerCase();
    return this.materials.filter(option => option.MaterialName.toLowerCase().includes(filterValue));
  }


}