import { Injectable } from '@angular/core';
import { Food } from '../../shared/models/Food';
import { DynamoDbService } from '../aws/DynamoDb.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  foods: Food[] = [];

  getFoodById(id: number): Food | null {
    return this.foods.find(food => food.id == id)!;

  }

  getAllBySearchTerm(searchTerm: string): Food[] {
    return this.foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }


  getAllByTag(tag: string): Food[] {
    if (tag == "All") {
      return this.foods;
    }

    //doing to lowercase so that we match
    return this.foods.filter(food => food.tags?.find(tg => tg.toLowerCase().includes(tag.toLowerCase())));
  }

  constructor(private dataService: DynamoDbService) { }

  loadFoods(foods: Food[]): void {
    if (this.foods.length <= 0) {
      this.dataService.getAllFoods()
        .then(data => {
          foods = data;
          console.log('Fetched foods:', this.foods);
        })
        .catch(error => {
          console.error('Error loading foods:', error);
        });
    }
  }

  getAllStatic(): Food[] {
    return [
      {
        id: 1,
        name: "Pizza CuceVreitu",
        price: 50,
        favorite: true,
        stars: 5,
        imageUrl: '/assets/images/food-6.png',
        origins: ["European"],
        tags: ["Pizza", "Fastfood"],
        cookTime: "30mins"
      },

      {
        id: 2,
        name: "Mingi de carne cu sos de rosii",
        price: 40,
        favorite: true,
        stars: 5,
        imageUrl: '/assets/images/food-2.png',
        origins: ["European"],
        cookTime: "1 hour",
        tags: ["Slow Food"]
      },

      {
        id: 3,
        name: "Lete pai prajit cu chetchap",
        price: 10,
        favorite: false,
        stars: 4,
        imageUrl: '/assets/images/food-3.png',
        origins: ["European"],
        cookTime: "1 hour",
        tags: ['Fastfood', 'Sweet', "Fry"]
      },

      {
        id: 4,
        name: "Hamburger",
        price: 30,
        favorite: true,
        stars: 3,
        imageUrl: '/assets/images/food-4.png',
        origins: ["European", "Germany"],
        cookTime: "30-45mins",
        tags: ['Fastfood', 'Hamburger']
      },

      {
        id: 5,
        name: "Supa ca la mama",
        price: 20,
        favorite: false,
        stars: 2,
        imageUrl: '/assets/images/food-5.png',
        origins: ["European"],
        cookTime: "15-30mins",
        tags: ["Soup"]
      },

      {
        id: 6,
        name: "Pizza Peperoni",
        price: 30,
        favorite: false,
        stars: 1,
        imageUrl: '/assets/images/food-1.png',
        origins: ["European"],
        tags: ["Pizza", "Fastfood"],
        cookTime: "30mins"
      },

    ]

  }
}
