import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FoodPageDetailComponent } from './food-page-detail/food-page-detail.component';
import { CartPageComponent } from './cart-page/cart-page.component';

export const routes: Routes = [
    {
            path: '', component: HomeComponent
        },
        {path: 'search/:searchTerm', component:HomeComponent},
        {path: 'tag/:tag', component:HomeComponent}, // show all the foods based on the tags
        {path: 'food/:id', component:FoodPageDetailComponent},
        {path: 'cart', component:CartPageComponent}

];
