import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Lost } from '../zClasses/Lost';
import { BehaviorSubject } from 'rxjs';
import { Found } from '../zClasses/Found';

@Injectable({
  providedIn: 'root'
})
export class SearchesService {
  // public data = {
  //   Categories: new BehaviorSubject<Category[]>([]),
  //   Items: new BehaviorSubject<Item[]>([]),
  //   Material: new BehaviorSubject<Material[]>([])
  // }
 public search={
  SuitableLosts:new BehaviorSubject<Lost[]>([]),
  SuitableFounds:new BehaviorSubject<Found[]>([]),
  SuitableLostsScore:new BehaviorSubject<Lost[]>([]),
  SuitableFoundsScore:new BehaviorSubject<Found[]>([])
 }
public ditails={
  categoryId:new Number(0),
  latitude:0,
  longitude:0,
  radius:0
}
  constructor(private http:HttpClient,private router:Router) { }
//יש לשלוח נתונים

   UniversalSearchInLosts(categoryIdA:Number, locationla:number, locationln:number, radiusA:number)
   {
     debugger
    this.http.get('/api/Searches/SearchInLosts/', { params: { categoryId: categoryIdA.toString(), locationlat: locationla.toString(), locationlng: locationln.toString(), radius: radiusA.toString() } }).subscribe(x=>{
       let SuitableLosts:Lost[]=x as Lost[];
       this.search.SuitableLosts.next(SuitableLosts);
       console.log(SuitableLosts); 
       this.router.navigateByUrl('base/result/' + "Losts" );
    });
    this.ditails.categoryId=categoryIdA;
    this.ditails.latitude=locationla;
    this.ditails.longitude=locationln;
    this.ditails.radius=radiusA;
  }
  UniversalSearchInFounds(categoryIdA:Number, locationla:number,locationln:number, radiusA:number)
  {
    this.http.get('/api/Searches/SearchInFounds/',{ params: { categoryId: categoryIdA.toString(), locationlat: locationla.toString(), locationlng: locationln.toString(), radius: radiusA.toString() } }).subscribe(x=>{
      debugger;
       let SuitableFounds:Found[]=x as Found[];
       this.search.SuitableFounds.next(SuitableFounds);
       console.log(SuitableFounds);
       this.router.navigateByUrl('base/result/' + "Founds" );
    });
    this.ditails.categoryId=categoryIdA;
    this.ditails.latitude=locationla;
    this.ditails.longitude=locationln;
    this.ditails.radius=radiusA;
  }
  SaveFound(f:Found){
    // alert("dsfghj   "+f.UserId)

    this.http.post('/api/Data/SaveFound',f).subscribe(x=>{
      let SuitableLosts:Lost[]=x as Lost[];
      this.search.SuitableLostsScore.next(SuitableLosts);
      console.log("service lost",SuitableLosts)
      this.router.navigateByUrl('base/oksave/'+"Found");});
  } 
   SearchFound(f:Found){
    this.http.post('/api/Data/SearchFound',f).subscribe(x=>{
      let SuitableLosts:Lost[]=x as Lost[];
      this.search.SuitableLostsScore.next(SuitableLosts);
      console.log("service lost"+SuitableLosts)
      this.router.navigateByUrl('base/oksave/'+"Founds");});
  } 
  SaveLost(f:Lost){
    // alert("dsfghj   "+f.UserId)

    this.http.post('/api/Data/SaveLost',f).subscribe(x=>{
      let SuitableFounds:Found[]=x as Found[];
      this.search.SuitableFoundsScore.next(SuitableFounds);
      console.log("service found",SuitableFounds)
      this.router.navigateByUrl('base/oksave/'+"Lost");});
  } 
   SearchLost(f:Lost){
    this.http.post('/api/Data/SearchLost',f).subscribe(x=>{
      let SuitableFounds:Found[]=x as Found[];
      this.search.SuitableFoundsScore.next(SuitableFounds);
      console.log("service found"+SuitableFounds)
      this.router.navigateByUrl('base/oksave/'+"Losts");});
  } 
  
}
