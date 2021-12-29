import { Component, OnInit } from '@angular/core';
import { Lost } from '../../zClasses/Lost';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchesService } from '../../Services/searches.service';
import { Category } from '../../zClasses/Category';
import { FormGroup, FormControl } from '@angular/forms';
import { LatLngLiteral, Geocoder, AgmGeocoder, GeocoderRequest } from '@agm/core';
import { Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/Services/data.service';
import { Found } from 'src/app/zClasses/Found';

// dialog עבור קומפוננטות המשתמשות ב  
// import { DialogOverviewExampleDialog } from 'src/app/UserDetails/item-button/item-button.component';
//import { MatDialog } from '@angular/material/dialog';

//import {DataViewModule} from 'primeng/dataview';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  SuitableLosts: Lost[] = [];
  SuitableFounds: Found[] = [];
  itemsNames: String[] = [];
  addresses: String[] = [];
  item: string;
  isLost:boolean;
  resultList: FormGroup;
  messageText: string;
  // CategorySelectedId: Number;
  // Location2: string;
  // Radius: Number;

  // private geocoder;

  constructor(private routerActivate: ActivatedRoute, private search: SearchesService, public dialog: MatDialog, private router: Router, public data: DataService) {
    // this.CategorySelectedId = parseInt(this.routerActivate.snapshot.params.categorySelectedId);
    // this.Location1 = this.routerActivate.snapshot.params.location1;
    // this.Location2 = this.routerActivate.snapshot.params.location2;
    // this.Radius = parseInt(this.routerActivate.snapshot.params.radius);

    //חיפוש אוניברסלי ולאחריו הכנסת התוצאות לרשימה המקומית
    // this.search.UniversalSearchInLosts(this.CategorySelectedId, this.Location1, this.Location2, this.Radius);
    this.item = this.routerActivate.snapshot.params.items;
    if (this.item == "Losts") {
      this.isLost=true;
      debugger
      search.search.SuitableLosts.subscribe(x => {
        this.SuitableLosts = [];
        this.SuitableLosts.push(...x as Lost[]);
        console.log("SuitableLosts id: ", this.SuitableLosts);
        this.itemsNames=[];
        this.SuitableLosts.forEach(x => this.itemsNames.push(data.data.Items.value.find(y => y.ItemId == x.ItemId).ItemName))
        this.addresses = [];
        let i = 0;
        this.SuitableLosts.forEach(x => this.getAddress(x.LostLat, x.LostLng, i++))
        console.log(this.itemsNames);
        // this.SuitableLosts.forEach(x => x.LostDate=new Date(x.LostDate.toString()))
        // let dd= new Date(this.SuitableLosts[0].LostDate.toString()) 
        // if(this.SuitableLosts.length==0)
      });
    }
    else {
      this.isLost=false;
      debugger
      search.search.SuitableFounds.subscribe(x => {
        this.SuitableFounds = [];
        this.SuitableFounds.push(...x as Found[]);
        console.log("SuitableFounds id: ", this.SuitableFounds);
        this.itemsNames=[];
        this.SuitableFounds.forEach(x => this.itemsNames.push(data.data.Items.value.find(y => y.ItemId == x.ItemId).ItemName))
        this.addresses = [];
        let i = 0;
        this.SuitableFounds.forEach(x => this.getAddress(x.FoundLat, x.FoundLng, i++))
        console.log(this.itemsNames);

        // this.SuitableFounds.forEach(x => x.LostDate=new Date(x.LostDate.toString()))
        // let dd= new Date(this.SuitableFounds[0].LostDate.toString()) 
      });
    }
  }
  click() {
    console.log("click");
    console.log("רשימת האבדות התואמות: " + this.SuitableLosts);
  }
  openDialogL(lost: Lost): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      //data: {name: lost.ItemName}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.messageText = result;
      if (result != undefined)
        this.data.mail(this.messageText, lost.LostId,this.isLost);
    });
  }
  openDialogF(found: Found): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      //data: {name: lost.ItemName}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.messageText = result;
      if (result != undefined)
        this.data.mail(this.messageText, found.FoundId,this.isLost);found.FoundAddress
    });
  }
  navigate() {
    if(this.isLost)
    this.router.navigateByUrl('base/search/saveLos');
    else
    this.router.navigateByUrl('base/search/saveFoun');
    // if(num==2)
    // else
    // this.router.navigateByUrl('base/myItems');    

  }

  getAddress(lat: number, lng: number, i: number) {
    console.log('Finding Address');
    if (navigator.geolocation) {
      let geocoder = new google.maps.Geocoder();
      // let latlng = new google.maps.LatLng(lat, lng);
      // let request:GeocoderRequest;
      // request={ 'location': {lat: latlng.lat,lng:latlng.lng }};
      geocoder.geocode({ 'location': { lat: lat, lng: lng } }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          let result = results[0];
          let rsltAdrComponent = result.address_components;
          let resultLength = rsltAdrComponent.length;
          if (result != null) {
            debugger;

            this.addresses[i] = result.formatted_address;
            console.log(this.addresses)
          } else {
            alert('No address available!');
          }
        }
      });
    }
  }

  getAddress1(latitude, longitude) {
    let geocoder = new google.maps.Geocoder;

    // let geocoder = new google.maps.Geocoder;
    // Locale.getDefault()
    // addresses = geocoder.getFromLocation(latitude, longitude, 1); // Here 1 represent max location result to returned, by documents it recommended 1 to 5
    geocoder.geocode({ 'location': { lat: latitude, lng: longitude } },
      (results, status) => {
        console.log(results);
        console.log(status);
        debugger
        if (status === 'OK') {
          if (results[0]) {
            this.addresses.push(results[0].formatted_address)
            console.log(results[0].formatted_address)
            // this.addresses[0] = results[0].formatted_address;
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }

      });
    // String address = addresses.get(0).getAddressLine(0); // If any additional address line present than only, check with max available address lines by getMaxAddressLineIndex()
    // String city = addresses.get(0).getLocality();
    // String state = addresses.get(0).getAdminArea();
    // String country = addresses.get(0).getCountryName();
    // String postalCode = addresses.get(0).getPostalCode();
    // String knownName = addresses.get(0).getFeatureName(); // Only if available else return NULL
  }
  ngOnInit() {
    // ItemId :Number;
    // ItemName:String;
    // MaterialId:Number;
    // LostDescription:String;
    // LostDate:Number;
    // LostLocation:Number;
    // SearchRadius:Number; 
    // LostImage:String;
    // UserId:Number;


    // this.resultList=new FormGroup(){
    //   ItemId:new FormControl(),
    //   ItemName:new FormControl(),
    //   MaterialId:new FormControl(),
    //   LostLocation:new FormControl(),
    //   LostDescription:new FormControl(),
    //   LostDate:new FormControl(),
    //   LostImage:new FormControl()
    // }


    // this.productForm = new FormGroup({
    //   name: new FormControl(this.product.name, Validators.required),
    //   category: new FormControl(this.product.category),
    //   unit: new FormControl(this.product.units),
    //   price:  new FormControl(this.product.price)
    // })

    // this.productForm.controls.name.valueChanges.subscribe(name => console.log("current name: ", name))
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>
    //,@Inject(MAT_DIALOG_DATA) public name:string
  ) {
  }
  messageText: string = "";
  onNoClick(): void {
    this.dialogRef.close();
  }

}