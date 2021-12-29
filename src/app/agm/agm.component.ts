import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MouseEvent, LatLngLiteral, Circle } from '@agm/core';
import { Location, Appearance, GermanAddress } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { LatLng } from '@agm/core/services/google-maps-types';
import { User } from '../zClasses/user';

//import { } from '@agm/core/services/geocoder-service';
//import { google } from "google-maps";
//import { } from '@types/googlemaps';
declare const google: any;

// //Buza!// //לסדר את כלללללללל הפונקיות ,לט ולן כולם מקושרים לראשי- זיס

@Component({
  selector: 'app-agm',
  templateUrl: './agm.component.html',
  styleUrls: ['./agm.component.css']
})

export class AgmComponent implements OnInit {

  title: string = 'AGM project';
  lat: number;
  lng: number;
  radius: number;
  address: string;
  zoom: number;
  mtitle: string;//WHY?
  url="https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_purple.png"
  // url="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
  url1= "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png"
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef// לא ברור - בשימוש, אך לא ברור איך זה מתבצע
  //
  public appearance = Appearance;
  public selectedAddress: PlaceResult;
  @Input() companyLocation: LatLngLiteral = { lat: 0, lng: 0 }
  @Input() CompaniesList: User[]=[]; 
  // @Output() selectLocation: EventEmitter<LatLngLiteral> = new EventEmitter();
  @Output() selectLocation: EventEmitter<string[]> = new EventEmitter();
  @Output() selectRadius: EventEmitter<number> = new EventEmitter();
  // , com: boolean = false
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    console.log("i am here");
  }


  ngOnInit() {
    // רק לאחר שהמפה נטענה
    this.mapsAPILoader.load().then(() => {
      this.zoom = 14;
      this.lat= 31.771747406787878; this.lng= 35.211782455444336
      // this.lat= 31; this.lng= 35
      // debugger;
      this.geoCoder = new google.maps.Geocoder;//לצורך תרגום לכתובת
      if (this.companyLocation.lat == 0)
        this.setCurrentLocation();//מיקום נוכחי
      else {
        this.lat = this.companyLocation.lat;
        this.lng = this.companyLocation.lng;
        // this.zoom = 14;
        this.selectLocationMarkerRadius(this.lat, this.lng);
        this.getAddress(this.lat, this.lng);
      }
      console.log(this.CompaniesList);
      this.selectRadius.emit(550);//איתחול
      this.radius = 550;//איתחול
      //תשתית להשלמה אוטומטית
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //נותן תוצאת מיקום
          let place = autocomplete.getPlace(); //: google.maps.places.PlaceResult 
          //אימות תוצאה
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          ////// set latitude, longitude and zoom
          ////// מיותר? יתכן שקורה פעמיים...
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 14;
          console.log(this.zoom, 'zoom');
          this.markers = [{
            lat: this.lat,
            lng: this.lng,
            draggable: true
          }];
          //
        });
      });
    });
    //mmmmmmmmmmmmmmmmmmmmm
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        if(position.coords.latitude!=0)
        {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.zoom = 14;}
        this.selectLocationMarkerRadius(this.lat, this.lng);
        this.getAddress(this.lat, this.lng);
      });
    }
  }



  mapClicked($event: MouseEvent) {
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.selectLocationMarkerRadius(this.lat, this.lng);
    this.getAddress(this.lat, this.lng);
  }

  onLocationSelected(location: Location) {//why interface Location???
    this.lat = location.latitude;
    this.lng = location.longitude;
    // this.zoom = 14;
    this.selectLocationMarkerRadius(this.lat, this.lng);
    //פה צריך לבחור מיקום!!!
    //קריאה למרקר לשנות גודל
  }
  ///////////////////////////
  selectLocationMarkerRadius(latitude: number, longitude: number) {
    this.lat = latitude;//?need
    this.lng = longitude;//?need
    this.markers = [{
      lat: this.lat,
      lng: this.lng,
      draggable: true
    }];
    this.circle = [{ latitude: this.lat, longitude: this.lng, radius: this.radius }]
    // this.selectLocation.emit({ lat: this.lat, lng: this.lng });
    // debugger
    this.selectLocation.emit([this.lat.toString() ,this.lng.toString(),this.address]);
  }
  //
  circleDragEnd(c: circle, $event: MouseEvent) {//בעיה- מביא מיקום עכבר במקום את מרכז המעגל
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
    this.selectLocationMarkerRadius(this.lat, this.lng);
    // console.log('dragEnd', c, $event);
    // c.latitude = this.lat = $event.coords.lat;
    // c.longitude = this.lng = $event.coords.lng;
    // this.markers = [{
    //   lat: this.lat,
    //   lng: this.lng,
    //   draggable: true
    // }];
    //m.lat= $event.coords.lat,
  }
  markerDragEnd(m: marker, $event: MouseEvent) {//כרגע לא מופעל
    console.log('dragEnd', m, $event);
    m.lat = this.lat = $event.coords.lat;
    m.lng = this.lng = $event.coords.lng;
    console.log(this.markers);
    //
    this.getAddress(this.lat, this.lng);
    //
  }


  radiusChange($event: MouseEvent) {
    console.log('רדיוס שונה ל:', $event);
    this.radius = parseInt(Number($event).toString());
    this.circle[0].radius = this.radius;
    this.selectRadius.emit(this.radius);
  }
  getAddress(latitude, longitude) {//מתרגם מיקום לכתובת
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } },
      (results, status) => {
        console.log(results);
        console.log(status);
        if (status === 'OK') {
          if (results[0]) {
            this.address = results[0].formatted_address;
            // debugger
            this.selectLocation.emit([this.lat.toString() ,this.lng.toString(),this.address]);
          } else {
            // window.alert('No results found');
          }
        } else {
          // window.alert('Geocoder failed due to: ' + status);
        }
      });
  }
  onAutocompleteSelected(result: PlaceResult) {//מיותר?
    console.log('onAutocompleteSelected: ', result);
    this.address = result.formatted_address;
    // debugger
    this.selectLocation.emit([this.lat.toString() ,this.lng.toString(),this.address]);
  }
  onGermanAddressMapped($event: GermanAddress) {//לא ידוע
    // debugger
    console.log('onGermanAddressMapped', $event);
  }
  clickedMarker(label: string, index: number) {//נראה מיותר אולי לחילופין נשים במרקר כתובת
    console.log(`clicked the marker: ${label || index}`)
  }



  circle: circle[] = [];
  markers: marker[] = []
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

interface circle {
  latitude: number;
  longitude: number;
  radius: number;
}


// //app.component.ts

// import { Component, OnInit } from '@angular/core';
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent  implements OnInit {
//   title: string = 'AGM project';
//   latitude: number;
//   longitude: number;
//   zoom:number;


//   ngOnInit() {
//     this.setCurrentLocation();
//   }

//     // Get Current Location Coordinates
//     private setCurrentLocation() {
//       if ('geolocation' in navigator) {
//         navigator.geolocation.getCurrentPosition((position) => {
//           this.latitude = position.coords.latitude;
//           this.longitude = position.coords.longitude;
//           this.zoom = 15;
//         });
//       }
//     }

// @Component({
//   selector: 'app-agm',
//   templateUrl: './agm.component.html',
//   styleUrls: ['./agm.component.css']
// })

// export class AgmComponent implements OnInit {
//  title: string = 'AGM project';
//   latitude: number;
//   longitude: number;
//   zoom: number;
  // address: string;
  // private geoCoder;

  // @ViewChild('search')
  // public searchElementRef: ElementRef;


//  constructor(
  //   private mapsAPILoader: MapsAPILoader,
  //   private ngZone: NgZone
  // ) { }


  // ngOnInit() {
    //load Places Autocomplete
  //   this.mapsAPILoader.load().then(() => {
  //     this.setCurrentLocation();
  //     this.geoCoder = new google.maps.Geocoder;

  //     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
  //     autocomplete.addListener("place_changed", () => {
  //       this.ngZone.run(() => {
  //         //get the place result
  //         let place: google.maps.places.PlaceResult = autocomplete.getPlace();

  //         //verify result
  //         if (place.geometry === undefined || place.geometry === null) {
  //           return;
  //         }

  //         //set latitude, longitude and zoom
  //         this.latitude = place.geometry.location.lat();
  //         this.longitude = place.geometry.location.lng();
  //         this.zoom = 10;
  //       });
  //     });
  //   });
  // }



  // markerDragEnd($event: MouseEvent) {
  //   console.log($event);
  //   this.latitude = $event.coords.lat;
  //   this.longitude = $event.coords.lng;
  //   this.getAddress(this.latitude, this.longitude);
  // }

  // getAddress(latitude, longitude) {
  //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
  //     console.log(results);
  //     console.log(status);
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 12;
  //         this.address = results[0].formatted_address;
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }

  //   });
  // }
// }