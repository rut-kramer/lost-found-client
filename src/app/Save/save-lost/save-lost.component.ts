import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from '../../zClasses/Category';
import { Item } from '../../zClasses/Item';
import { DataService } from '../../Services/data.service';
import { Lost } from '../../zClasses/Lost';
import { Material } from '../../zClasses/Material';
import { UserService } from '../../Services/user.service';
import { SearchesService } from 'src/app/Services/searches.service';
import { Color } from 'src/app/zClasses/Color';
import { Found } from 'src/app/zClasses/Found';
import { LatLngLiteral } from '@agm/core';
import { User } from 'src/app/zClasses/user';
import { AutoFilterItemComponent } from 'src/app/Generate/auto-filter-item/auto-filter-item.component';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-save-lost',
  templateUrl: './save-lost.component.html',
  styleUrls: ['./save-lost.component.css']
})
export class SaveLostComponent implements OnInit {
  categories: Category[];
  ItemsToSelectedCategory: Item[] = [];
  materials: Material[] = [];
  losts: Lost[] = []
    lost: Lost = {
    LostId: 0, CategoryId: 0, ItemName: '', LostDate: new Date(), LostDescription: '', LostImage: '', LostLat: 0, LostLng: 0,
    ItemId: 0, MaterialId: 0, SearchRadius: 10, UserId: 0,Color1:0,Color2:0,Color3:0,LostAddress:'',LostStatus:false
  };
  oldlost: Lost
  isOld: boolean = false;
  lostCategoryName:String;
  lostItemName:String;
  lostMaterialName:String;
  ItemSelected: Item;
  colors: Color[] = [];
  renderItems: boolean = false;
  userSelectedLocation: LatLngLiteral = { lat: 0, lng: 0 };
  companies: User[];
  radius: number;
  @ViewChild(AutoFilterItemComponent) autoItem: AutoFilterItemComponent;



  constructor(private routerActivate: ActivatedRoute,private data: DataService,private u: UserService, private search: SearchesService) {
    this.materials = data.Materials;
    this.categories = data.Categories;
    this.colors = data.Colors;
    this.companies = data.Companies;
    debugger
    let user:User=JSON.parse(sessionStorage.user);
    this.lost.UserId =user.UserId;
    // alert(this.lost.UserId+"    dsfghj   "+u.currentUser.UserId)

  }

  // this.data.Items.forEach(x=>{if(x.CategoryId== this.found.CategoryId)this.ItemsToSelectedCategory.push(x);})

  ItemsToCategory(event: Category) {
    this.renderItems = false;
    this.lost.CategoryId = event.CategoryId;
    this.ItemsToSelectedCategory = [];
    this.data.Items.forEach(x => { if (x.CategoryId == this.lost.CategoryId) this.ItemsToSelectedCategory.push(x); })
    if (this.ItemsToSelectedCategory.length != 0)
      this.renderItems = true;
      else
      this.lost.ItemId = 1;
    this.autoItem.RefreshItemsToView(this.ItemsToSelectedCategory);
    // האם צריך להכניס ברירת מחדל לפריט?
    // this.lost.ItemId = this.ItemsToSelectedCategory[0].ItemId;
  }

  SelectedItem(event: Item) {
    this.lost.ItemId = event.ItemId;
  }
  MaterialSelected(event:any){
    let materialSelectedName=event.option.value;
      //let i=(Number)((event.option as HTMLSelectElement).value);
      console.log(materialSelectedName);
      let Selectedmaterial:Material=(this.materials.find(x=>x.MaterialName==materialSelectedName));
      this.lost.MaterialId=Selectedmaterial.MaterialId;
      if(Selectedmaterial==null)
      {
        alert("this חומר isn't exist. you can change it to another");
      }
    }
    selectedLocation(event: string[]) {
      debugger
      this.userSelectedLocation.lat = +event[0];
      this.userSelectedLocation.lng = +event[1];
      console.log(this.userSelectedLocation);
      this.lost.LostLat=this.userSelectedLocation.lat;
      this.lost.LostLng=this.userSelectedLocation.lng;
    }
    selectedRadius(event: number) {
      this.radius = event;
      console.log(this.radius, 'in-lost radius');
    }

    colorSelect(event: number) {
      debugger
      // this.Colors[0].ColorName=event.target.value
      if (this.lost.Color1 == 0) {
        this.lost.Color1 = this.colors[event].ColorId;
        document.getElementById("p1").style.backgroundColor = this.colors[event].ColorName + ""
        document.getElementById("p1").innerText = ""
      }
      else
        if (this.lost.Color2 == 0) {
          this.lost.Color2 = this.colors[event].ColorId;
          document.getElementById("p2").style.backgroundColor = this.colors[event].ColorName + ""
          document.getElementById("p2").innerText = ""
        }
        else
          if (this.lost.Color3 == 0) {
            this.lost.Color3 = this.colors[event].ColorId;
            document.getElementById("p3").style.backgroundColor = this.colors[event].ColorName + ""
            document.getElementById("p3").innerText = ""
  
          }
    }
  Save() {
    this.search.SaveLost(this.lost);
  }
  
  materialControl=new FormControl();
  
  filteredOptions: Observable<Material[]>;

  ngOnInit() {
    this.filteredOptions=this.materialControl.valueChanges.pipe(
      startWith(''),
      map(value=>this._filter(value))
    );



    if (this.routerActivate.snapshot.params.object) {


      this.u.userLosts.SuitableLosts.subscribe(x => {
        debugger
        this.losts = [];
        this.losts.push(...x as Lost[]);

        let i: number;
        i = (this.routerActivate.snapshot.params.object as number);
        //לטפל בשליחה והעברה של אובייקט לעריכה

        var dataJson = JSON.stringify(this.losts[i]);
        this.lost = JSON.parse(dataJson);
        this.oldlost = JSON.parse(dataJson);
        //this.lost = this.oldfound = this.losts[i];
        this.isOld = true;
        console.log("old lost", this.oldlost)
        debugger

        // מציאת שם הקטגוריה של המציאה
        this.lostCategoryName = this.data.data.Categories.value.find(y => y.CategoryId == this.oldlost.CategoryId).CategoryName

        // this.renderItems = true;

        // מציאת שם הפריט של המציאה
        this.lostItemName = this.data.data.Items.value.find(y => y.ItemId == this.oldlost.ItemId).ItemName;
        // מציאת שם MaterialName של המציאה
        this.lostMaterialName = this.data.data.Materials.value.find(y => y.MaterialId == this.oldlost.MaterialId).MaterialName;
        //מיקום המפה בהתאם למציאה
        this.userSelectedLocation.lat = this.oldlost.LostLat
        this.userSelectedLocation.lng = this.oldlost.LostLng
        // // אם הוא רשם שם פריט?
        if (this.oldlost.ItemName == '')
          this.oldlost.ItemName = ' ';



        });

      }
      document.getElementById("textArea").click();


  }
  private _filter(value: String): Material[] {
    const filterValue = value.toLowerCase();
    return this.materials.filter(option => option.MaterialName.toLowerCase().includes(filterValue));
}

}
