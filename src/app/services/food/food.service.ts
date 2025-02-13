import { Injectable } from '@angular/core';
import { Food } from '../../shared/models/Food';
import { Tag } from '../../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  getFoodById(id: number): Food {
    //put the ! at the end so that we make sure this function will not return undefined
    return this.getAll().find(food => food.id == id)!;
  }

  getAllBySearchTerm(searchTerm: string): Food[] {
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  getAllTags():Tag[]{
    return [
      { name: 'All', count: 14 },
      { name: 'Fastfood', count: 4 },
      { name: 'Pizza', count: 2 },
      { name: 'Lunch', count: 3 },
      { name: 'Slow Food', count: 1 },
      { name: 'Hamburger', count: 1 },
      { name: 'Fry', count: 1 },
      { name: 'Soup', count: 1 },
    ];
  }

  getAllByTag(tag: string): Food[] {
    if (tag == "All") {
      return this.getAll();
    }

    return this.getAll()
      .filter(food => food.tags?.includes(tag))
  }

  constructor() { }

  getAll(): Food[] {
    return [

      {
        id: 1,
        name: "Pizza CuceVreitu",
        price: 50,
        favorite: true,
        stars: 5,
        imageurl: '/assets/images/food-6.png',
        origins: ["European"],
        tags:["Pizza", "Fastfood"],
        cookTime: "30mins"
      },

      {
        id: 2,
        name: "Mingi de carne cu sos de rosii",
        price: 40,
        favorite: true,
        stars: 5,
        imageurl: '/assets/images/food-2.png',
        origins: ["European"],
        cookTime: "1 hour",
        tags:["Slow Food"]
      },

      {
        id: 3,
        name: "Lete pai prajit cu chetchap",
        price: 10,
        favorite: false,
        stars: 4,
        imageurl: '/assets/images/food-3.png',
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
        imageurl: '/assets/images/food-4.png',
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
        imageurl: '/assets/images/food-5.png',
        origins: ["European"],
        cookTime: "15-30mins",
        tags:["Soup"]
      },

      {
        id: 6,
        name: "Pizza Peperoni",
        price: 30,
        favorite: false,
        stars: 1,
        imageurl: '/assets/images/food-1.png',
        origins: ["European"],
        tags:["Pizza", "Fastfood"],
        cookTime: "30mins"
      },

    ]

  }
}
