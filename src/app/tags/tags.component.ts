import { Component, Input, OnInit } from '@angular/core';
import { Tag } from '../shared/models/Tag';
import { CarService } from '../services/car/car.service';
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
  carPageTags?: string[];

  @Input()
  justifyContent: string = 'center';

  tags: Tag[] = [];

  constructor(private carService: CarService,
    private dynamoDbS: DynamoDbService
  ) { }

  ngOnInit(): void {
    if (!this.carPageTags)
      this.loadAllTags();
  }

  loadAllTags() {
    const map = this.carService.cars.flatMap(car => car.tags).reduce(
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
    this.dynamoDbS.getAllCars()
      .then(data => {
        const map = data.flatMap(car => car.tags).reduce(
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
        console.error('Error loading cars:', error);
      });
  }
}
