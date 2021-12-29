import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgmCoreModule } from '@agm/core';
import { } from '@agm/core/services/google-maps-types';

 import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule} from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { SignUpComponent } from './Entry/sign-up/sign-up.component';
import { SignInComponent } from './Entry/sign-in/sign-in.component';
import { BaseComponentComponent } from './base-component/base-component.component';
import { routes } from './routes';
import { SignUpCompanyComponent } from './Entry/sign-up-company/sign-up-company.component';
import { SearchInLostComponent } from './Search/search-in-lost/search-in-lost.component';
import { SearchInFoundComponent } from './Search/search-in-found/search-in-found.component';
import { SaveLostComponent } from './Save/save-lost/save-lost.component';
import { SaveFoundComponent } from './Save/save-found/save-found.component';
import { UserItemsComponent } from './MyItems/user-items/user-items.component';
import { ResultComponent, DialogOverviewExampleDialog } from './Search/result/result.component';
import { CompanySaveComponent } from './Save/company-save/company-save.component';
import { OksaveComponent } from './Save/oksave/oksave.component';
import { ItemDetailsComponent } from './MyItems/item-details/item-details.component';
import { WhichOwnerReturnedComponent } from './MyItems/which-owner-returned/which-owner-returned.component';
import { EntryComponent } from './Entry/entry/entry.component';
import { ImportComponent } from './import/import.component';
import { AutoFilterCategoryComponent } from './Generate/auto-filter-category/auto-filter-category.component';
import { AgmComponent } from './agm/agm.component';
import { AutoFilterItemComponent } from './Generate/auto-filter-item/auto-filter-item.component';
import { ItemButtonComponent } from './MyItems/item-button/item-button.component';
import { OpeningSearchComponent } from './Search/opening-search/opening-search.component';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from './Search/search/search.component';
// import{HttpModule} from '@angular/http';
//import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    BaseComponentComponent,
    SignUpCompanyComponent,
    SearchInLostComponent,
    SearchInFoundComponent,
    SaveLostComponent,
    SaveFoundComponent,
    UserItemsComponent,
    ResultComponent,
    CompanySaveComponent,
    OksaveComponent,
    ItemDetailsComponent,
    WhichOwnerReturnedComponent,
    EntryComponent,
    ImportComponent,
    AutoFilterCategoryComponent,
    AgmComponent,
    AutoFilterItemComponent,
    ItemButtonComponent,
    DialogOverviewExampleDialog,
    OpeningSearchComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatAutocompleteModule,
    MatDatepickerModule,MatNativeDateModule, //MatMomentDateModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot({
      //apiKey: 'AIzaSyAvcDy5ZYc2ujCS6TTtI3RYX5QmuoV8Ffw'
      // apiKey: 'AIzaSyCeAtVYKR6-eYddASEkHBsgZ1HIkmmtk4c',
      apiKey: 'AIzaSyB2fJc_h6ideUqZRx68XMFfw_8-Fq9hC68',
      
      libraries: ['places']
      //AIzaSyCeAtVYKR6-eYddASEkHBsgZ1HIkmmtk4c  AIzaSyAS--O9TAVAD6oYHmrSfemoG01i_x9_5jA  
    })
    //,types,googleMaps
    //, MatGoogleMapsAutocompleteModule
    //,AgmCoreModule.forRoot()
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
