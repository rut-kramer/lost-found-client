import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lost } from 'src/app/zClasses/Lost';
import { Found } from 'src/app/zClasses/Found';
import { SearchesService } from 'src/app/Services/searches.service';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-oksave',
  templateUrl: './oksave.component.html',
  styleUrls: ['./oksave.component.css']
})
export class OksaveComponent implements OnInit {
  display = true;
  item: string;
  isLost: boolean;
  losts: Lost[]=[];
  founds: Found[]=[];
  itemsNames: String[] = [];

  constructor(routerActivate: ActivatedRoute, private router: Router, private search: SearchesService, private data: DataService) {
    //debugger;
    this.item = (routerActivate.snapshot.params.item) + "";
    if (this.item == "Found" || this.item == "Founds") {
      this.isLost = false;
      console.log("Found");
      search.search.SuitableLostsScore.subscribe(x => {
        debugger
        let lost: Lost[] = [];
        lost.push(...x as Lost[]);
        this.losts = [];
        this.losts = lost.filter(o => o.ItemId != 0);
        console.log("SuitableLosts id: ", this.losts);
        this.itemsNames = [];
        this.losts.forEach(x => this.itemsNames.push(data.data.Items.value.find(y => y.ItemId == x.ItemId).ItemName))
        console.log(this.itemsNames);
        // this.addresses=[];
        // let i=0;
        // this.losts.forEach(x => this.getAddress(x.LostLat,x.LostLng,i++))
      });
    }
    else
      if (this.item == "Lost" || this.item == "Losts") {
        this.isLost = true;
        console.log("Lost");
        search.search.SuitableFoundsScore.subscribe(x => {
          debugger
          let found: Found[] = [];
          found.push(...x as Found[]);
          console.log("SuitableFoundsScore id: ", this.founds);

          this.founds = [];
          this.founds = found.filter(o => o.ItemId != 0);
          this.itemsNames = [];
          this.founds.forEach(x => this.itemsNames.push(data.data.Items.value.find(y => y.ItemId == x.ItemId).ItemName))
          console.log(this.itemsNames);
        });
      }
  }
  // losts
  openDialogF(m: Found) { }
  ngOnInit() {
  }
  navigate(num: number) {
    if (num == 1)
      this.router.navigateByUrl('base/search/saveLos');
    else
      if (num == 2)
        this.router.navigateByUrl('base/search/saveFoun');
      else
        this.router.navigateByUrl('base/myItems');

  }
  addItem() {
    this.display = false;
  }
}
