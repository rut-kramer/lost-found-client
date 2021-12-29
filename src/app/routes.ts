import { Routes } from "@angular/router";
import { SignInComponent } from "./Entry/sign-in/sign-in.component";
import { SignUpComponent } from "./Entry/sign-up/sign-up.component";
import { BaseComponentComponent } from "./base-component/base-component.component";
import { UserService } from "./Services/user.service";
import { SignUpCompanyComponent } from "./Entry/sign-up-company/sign-up-company.component";
import { SearchInLostComponent } from "./Search/search-in-lost/search-in-lost.component";
import { SearchInFoundComponent } from "./Search/search-in-found/search-in-found.component";
import { SaveLostComponent } from "./Save/save-lost/save-lost.component";
import { SaveFoundComponent } from "./Save/save-found/save-found.component";
import { OksaveComponent } from "./Save/oksave/oksave.component";
import { UserItemsComponent } from "./MyItems/user-items/user-items.component";
import { Component } from "@angular/core";
import { ResultComponent } from "./Search/result/result.component";
// import { PARAMETERS } from "@angular/core/src/util/decorators";
import { EntryComponent } from "./Entry/entry/entry.component";
import { ItemButtonComponent } from './MyItems/item-button/item-button.component';
import { OpeningSearchComponent } from './Search/opening-search/opening-search.component';
import { SearchComponent } from './Search/search/search.component';

export const routes: Routes = [
    {
        path: '',
        component: EntryComponent,
        children: [
            {
                path: 'signUp',
                component: SignUpComponent
            },
            {
                path: 'signUpCompany',
                component:
                    SignUpCompanyComponent
            },
            {
                path: 'signIn',
                component: SignInComponent
            }
        ]
    },
    {
        path: 'base',
        component: BaseComponentComponent,
        children: [

            {
                path: '',
                component: OpeningSearchComponent
            },
            {
                path: 'search/:comp',
                component: SearchComponent
                , children: [

                    {
                        path: 'searchInLost',
                        component: SearchInLostComponent
                    },
                    {
                        path: 'searchInFound',
                        component: SearchInFoundComponent
                    },
                    {
                        path: 'saveLost',
                        component: SaveLostComponent
                    },
                    {
                        path: 'saveFound',
                        component: SaveFoundComponent
                    }
                ]
            },
            {
                path: 'searchInLost',
                component: SearchInLostComponent
            },
            {
                // path:'result/:categorySelectedId/:radius/:categories',
                path: 'result/:items',
                component: ResultComponent
            },
            {
                path: 'searchInFound',
                component: SearchInFoundComponent
            },
            {
                path: 'saveLost/:object',
                component: SaveLostComponent
            },
            {
                path: 'saveFound/:object',
                component: SaveFoundComponent
            },
            {
                path: 'oksave/:item',
                component: OksaveComponent
            },

            {
                path: 'myItems',
                component: UserItemsComponent
            },
            //limcok behizdamnut!!!!
            {
                path: '1',
                component: ItemButtonComponent
            }
        ]
    }
]