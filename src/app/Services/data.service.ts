import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../zClasses/Category';
import { Item } from '../zClasses/Item';
import { Material } from '../zClasses/Material';
import { Lost } from '../zClasses/Lost';
import { Found } from '../zClasses/Found';
import { ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../zClasses/user';
import { Color } from '../zClasses/Color';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public data = {
    Categories: new BehaviorSubject<Category[]>([]),
    Companies: new BehaviorSubject<User[]>([]),
    Items: new BehaviorSubject<Item[]>([]),
    Materials: new BehaviorSubject<Material[]>([]),
    Colors: new BehaviorSubject<Color[]>([]),
    // bool:new BehaviorSubject<boolean>(false)
  }
  Categories: Category[] = [];
  Companies: User[] = [];
  Items: Item[] = [];
  Materials: Material[] = [];
  Colors: Color[] = [];

  constructor(private http: HttpClient, private router: Router) {
    this.GetCategories();
    this.GetCompanies();
    this.GetItems();
    this.GetMaterial();
    this.GetColors();
  }

  GetCategories() {
    console.log("Get Categories");
    this.http.get('/api/Data/GetCategories').subscribe(x => {
      this.Categories.push(...(x as Category[]));
      this.data.Categories.next(this.Categories);
    });
  }

  GetCompanies() {
    console.log("Get GetCompanies");
    this.http.get('/api/Data/GetCompanies').subscribe(x => {
      this.Companies.push(...(x as User[]));
      this.data.Companies.next(this.Companies);
    });
  }
  GetItems() {
    console.log("Get Items");
    this.http.get('/api/Data/GetItems').subscribe(x => {
      this.Items.push(...(x as Item[]));
      this.data.Items.next(this.Items);
    });
  }
  GetMaterial() {
    console.log("Get Material");
    this.http.get('/api/Data/GetMaterial').subscribe(x => {
      this.Materials.push(...(x as Material[]));
      this.data.Materials.next(this.Materials);
    });
  }
  GetColors() {
    console.log("Get GetColors");
    this.http.get('/api/Data/GetColors').subscribe(x => {
      this.Colors.push(...(x as Color[]));
      this.data.Colors.next(this.Colors);
    });
  }
  // api/Data/GetColors


  DeleteFound(l: Found) {
    return this.http.post('/api/Data/DeleteFound', l);
  }

  DeleteLost(l: Lost) {
    return this.http.post('/api/Data/DeleteLost', l);
    // .subscribe(x => {
    //   // if (x == true)
    //   //   alert("נמחקה בהצלחה")
    //   // else
    //   //   alert("שגיאה")
    //   // return true;
    // });
  }
  UpdateFound(l: Found) {
    this.http.post('/api/Data/UpdateFound', l).subscribe(k => {
      this.router.navigateByUrl('base/myItems');
    });
  }

  UpdateLost(l: Lost) {
    this.http.post('/api/Data/UpdateLost', l).subscribe(k => {
      this.router.navigateByUrl('base/myItems');
    });
  }
  UpdateFoundStatus(id: Number) {
    return this.http.get('/api/Data/UpdateFoundStatus', { params: { id: id.toString() } });
  }
  UpdateLostStatus(id: Number) {
    return this.http.get('/api/Data/UpdateLostStatus', { params: { id: id.toString() } });
  }

  mail(text: string, id: Number, isLost: boolean) {
    this.http.get('/api/Data/mail/', { params: { text: text.toString(), id: id.toString(), isLost: isLost + "" } }).subscribe
      (x => {
        // alert("erxtxx!!!" + x.toString())
      });

  }
}

