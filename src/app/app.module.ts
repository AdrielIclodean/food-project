
import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'

import {AppComponent} from './app.component'
import {HeaderComponent} from './header/header.component'

import { HomeComponent } from './home/home.component'
import { CommonModule } from '@angular/common'
import { SearchComponent } from './search/search.component'
import {FormsModule} from '@angular/forms'
import { TagsComponent } from './tags/tags.component'
import { FoodPageDetailComponent } from './food-page-detail/food-page-detail.component'
import { CartPageComponent } from './cart-page/cart-page.component'
import { NotFoundComponent } from './not-found/not-found.component'

import Amplify from 'aws-amplify';

Amplify.Amplify.configure({
    auth:{
      aws_region: 'eu-central-1',
      user_pool_id: 'eu-central-1_zZBzuS3hF',//'Taken from Cognito user pool',
      user_pool_client_id: '5fsql4k1o42bs8jcqfufrrpvpn'//'Taken from Cognito user pool -> App Integration -> App client list'
  }
})

@NgModule({
  declarations: [

    ],
  imports: [
    BrowserModule,
    AppComponent,
    HeaderComponent,
    HomeComponent,
    CommonModule,
    SearchComponent,
    FormsModule,
    TagsComponent,
    FoodPageDetailComponent,
    CartPageComponent,
    NotFoundComponent
    ],

  providers: [],
  bootstrap: []
  })
export class AppModule{}
