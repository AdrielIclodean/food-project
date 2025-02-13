import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { CommonModule } from '@angular/common';
import { Food } from '../shared/models/Food';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchComponent } from "../search/search.component";
import { TagsComponent } from "../tags/tags.component";
import { NotFoundComponent } from "../not-found/not-found.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, StarRatingComponent, SearchComponent, TagsComponent, RouterModule, NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];
  constructor(private foodService: FoodService, private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        if (params['searchTerm'] !== undefined) {
          this.foods = this.foodService.getAllBySearchTerm(params['searchTerm']);
        }

        else if(params['tag']){
          this.foods = this.foodService.getAllByTag(params['tag']);
        }
        else{
          this.foods = this.foodService.getAll();
        }
      }
    );

  }

}
