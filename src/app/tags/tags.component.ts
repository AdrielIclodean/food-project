import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../shared/models/Tag';
import { FoodService } from '../services/food/food.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DynamoDbService } from '../services/aws/DynamoDb.service';

@Component({
  selector: 'app-tags',
  imports: [CommonModule, RouterModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent implements OnInit {

  @Input()
  foodPageTags?: string[];

  @Input()
  justifyContent: string = 'center';

  tags: Tag[] = [];

  constructor(private foodService: FoodService,
    private dynamoDbS: DynamoDbService
  ) { }

  ngOnInit(): void {
    if (!this.foodPageTags)
      this.loadAllTags();
  }

  loadAllTags() {
    const map = this.foodService.foods.flatMap(food => food.tags).reduce(
      (acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()
    )

    map.forEach((val, key) =>
      this.tags.push(
        {
          name: key,
          count: val
        }
      )
    );

    this.tags.splice(0, 0, 
      {
        name: "All",
        count: this.tags.length
      }
    );
  }

  loadAllTagsFromDynamoDb() {
    this.dynamoDbS.getAllFoods()
      .then(data => {
        const map = data.flatMap(food => food.tags).reduce(
          (acc, e) => acc.set(e, (acc.get(e) || 0) + 1), new Map()
        )

        map.forEach((val, key) =>
          this.tags.push(
            {
              name: key,
              count: val
            }
          )
        );
        console.log('Fetched tags:', map);
      })
      .catch(error => {
        console.error('Error loading foods:', error);
      });
  }
}
