import { Injectable } from '@angular/core';
import { Car } from '../../shared/models/Car';
import { Subject } from 'rxjs';
import { DynamoDbService } from '../aws/DynamoDb.service';
import { PaginationService } from '../pagination.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  cars: Car[] = [];

  // object that is observable and any change on it will reflect in the ui
  messageSource: Subject<Car[]>;

  constructor(dynamoDB: DynamoDbService
  ) { 

    this.messageSource = new Subject<Car[]>();
  }

  getCarById(id: number): Car | null {
    return this.cars.find(car => car.id == id)!;

  }

 /*  getAllBySearchTerm(searchTerm: string): Car[] {
    // return this.cars.filter(car => car.name.toLowerCase().includes(searchTerm.toLowerCase()))

    
    // return this.paginationService.getNextForSearch(searchTerm);
  } */


  getAllByTag(tag: string): Car[] {
    if (tag == "All") {
      return this.cars;
    }

    //doing to lowercase so that we match
    return this.cars.filter(car => car.tags?.find(tg => tg.toLowerCase().includes(tag.toLowerCase())));
  }

}
