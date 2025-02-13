import { Component, OnInit } from '@angular/core';
import { Food } from '../shared/models/Food';
import { FoodService } from '../services/food/food.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { TagsComponent } from "../tags/tags.component";
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart/cart.service';
import { NotFoundComponent } from "../not-found/not-found.component";

@Component({
  selector: 'app-food-page-detail',
  imports: [StarRatingComponent, TagsComponent, CommonModule, NotFoundComponent],
  templateUrl: './food-page-detail.component.html',
  styleUrl: './food-page-detail.component.css'
})
export class FoodPageDetailComponent implements OnInit{
  food!: Food;
  
  constructor(private foodService:FoodService, 
    private activateRoute:ActivatedRoute,
  private cartService:CartService,
  private router:Router

){

  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      params => {
        if(params['id'])
          this.food = this.foodService.getFoodById(params['id']);  
      }
    )
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl("/cart");
  }

}
