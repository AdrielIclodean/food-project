import { Injectable } from '@angular/core';
import { Car } from '../shared/models/Car';
import { DynamoDbService } from './aws/DynamoDb.service';
import { CarService } from './car/car.service';
import { Page } from '../shared/models/Page';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  
  lastEvaluatedKey: string = '';

  currentPageIndex: number = -1;

  pages: Page[] = [];
  searchPages: Page[] = [];

  constructor(private dynamoDbService: DynamoDbService,
    private carService: CarService
  ) { }

  getFirstPage(pageLimit: number){
    if(this.pages.length > 0){
      this.currentPageIndex = 0;
      this.updateCars(this.pages[this.currentPageIndex].cars);
      return;
    }

    this.nextPage(pageLimit);
  }


  nextPage(limit: number) {
    if (this.pages.length > this.currentPageIndex + 1) {
      // we already have the page loaded
      this.currentPageIndex += 1;

      this.updateCars(this.pages[this.currentPageIndex].cars);
      return;
    }

    // we are asking for the first page
    // or
    // there is a next page in dynamodb
    if (this.pages.length == 0 || this.pages[this.currentPageIndex].lastEvaluatedKey) {
      let lastEvaluatedKey = undefined;
      if (this.pages.length > 0) {
        lastEvaluatedKey = this.pages[this.currentPageIndex].lastEvaluatedKey
      }

      this.dynamoDbService.getCarsPage(
        //get next page from last page
        lastEvaluatedKey,
        limit
      )
        .then(data => {
          if (data.Items?.length != 0) {
            this.updateCars(data.Items as unknown as Car[]);
            this.currentPageIndex += 1;
            this.pages.push({
              cars: this.carService.cars,
              lastEvaluatedKey: data.LastEvaluatedKey,
              pageIndex: this.currentPageIndex
            });

          }
          console.log('Fetched cars for new page ' + this.currentPageIndex);
        })
        .catch(error => {
          console.error('Error loading cars:', error);
        });
    }
  }

  private updateCars(cars: Car[]) {
    this.carService.cars = cars;
    this.carService.messageSource.next(cars);
  }

  previousPage() {
    if (this.currentPageIndex - 1 < 0) {
      return;
    }

    this.updateCars(this.pages[this.currentPageIndex - 1].cars)
    this.currentPageIndex -= 1;
  }

  getNextPageBySearchTerm(searchTerm: string, pageLimit: number) {
    this.getNextForSearch(searchTerm, pageLimit);
  }

  getNextForSearch(searchTerm: string, pageLimit: number) {
    if (this.searchPages.length > this.currentPageIndex + 1) {
      // we already have the page loaded
      this.currentPageIndex += 1;

      this.updateCars(this.searchPages[this.currentPageIndex].cars);
      return;
    }

    // we are asking for the first page
    // or
    // there is a next page in dynamodb
    if (this.searchPages.length == 0 || this.searchPages[this.currentPageIndex].lastEvaluatedKey) {
      let lastEvaluatedKey = undefined;
      if (this.searchPages.length > 0) {
        lastEvaluatedKey = this.searchPages[this.currentPageIndex].lastEvaluatedKey
      }

      this.dynamoDbService.searchCarByName(
        //get next page from last page
        lastEvaluatedKey,
        searchTerm,
        pageLimit
      )
        .then(data => {
          if (data.Items?.length != 0) {
            this.updateCars(data.Items as unknown as Car[]);
            this.currentPageIndex += 1;
            this.searchPages.push({
              cars: this.carService.cars,
              lastEvaluatedKey: data.LastEvaluatedKey,
              pageIndex: this.currentPageIndex
            });

          }
          console.log('Fetched cars for new page for search ' + this.currentPageIndex);
        })
        .catch(error => {
          console.error('Error loading cars:', error);
        });
    }
  }
}
