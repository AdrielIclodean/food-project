import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarPageDetailComponent } from './car-page-detail/car-page-detail.component';
import { CartPageComponent } from './cart-page/cart-page.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    { path: 'search/:searchTerm', component: HomeComponent },
    { path: 'tag/:tag', component: HomeComponent }, // show all the cars based on the tags
    { path: 'car/:id', component: CarPageDetailComponent },
    { path: 'cart', component: CartPageComponent }

];
