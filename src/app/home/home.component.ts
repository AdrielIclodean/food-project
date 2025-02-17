import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food/food.service';
import { CommonModule } from '@angular/common';
import { Food } from '../shared/models/Food';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchComponent } from "../search/search.component";
import { TagsComponent } from "../tags/tags.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import { DynamoDbService } from '../services/aws/DynamoDb.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, StarRatingComponent, SearchComponent, TagsComponent, RouterModule, NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  foods: Food[] = [];

  constructor(private foodService: FoodService,
    private route: ActivatedRoute,

    private dynamoDbService: DynamoDbService) {

    this.loadFoods();
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params['searchTerm'] !== undefined) {
          this.foods = this.foodService.getAllBySearchTerm(params['searchTerm']);
        }

        else if (params['tag']) {
          this.foods = this.foodService.getAllByTag(params['tag']);
        }

        else {
          this.loadFoods();
        }
      }
    );

  }

  loadFoods(): void {
    if (this.foodService.foods.length == 0) {
      this.dynamoDbService.getAllFoods()
        .then(data => {
          this.foods = data;
          this.foodService.foods = data;
          console.log('Fetched foods:', this.foods);
        })
        .catch(error => {
          console.error('Error loading foods:', error);
        });
    } else {
      this.foods = this.foodService.foods;
    }
  }

}
