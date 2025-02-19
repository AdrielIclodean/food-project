import { Component, OnInit } from '@angular/core';
import { CarService } from '../services/car/car.service';
import { CommonModule } from '@angular/common';
import { Car } from '../shared/models/Car';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchComponent } from "../search/search.component";
import { TagsComponent } from "../tags/tags.component";
import { NotFoundComponent } from "../not-found/not-found.component";
import { PaginationWithArrowsComponent } from '../pagination-with-arrows/pagination-with-arrows.component';
import { PaginationService } from '../services/pagination.service';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    StarRatingComponent,
    SearchComponent,
    TagsComponent,
    RouterModule,
    NotFoundComponent,
    PaginationWithArrowsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  cars: Car[] = [];
  pageLimit: number;

  constructor(private carService: CarService,
    private route: ActivatedRoute,
    private paginationService: PaginationService
  ) {

    this.pageLimit = 4;
    this.carService.messageSource.asObservable().subscribe((cars: Car[]) => {
      this.cars = cars;
    });
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        if (params['searchTerm'] !== undefined) {
          this.paginationService.getNextPageBySearchTerm(params['searchTerm'], this.pageLimit);
        }

        else if (params['tag']) {
          this.cars = this.carService.getAllByTag(params['tag']);
        } else {
          this.paginationService.getFirstPage(this.pageLimit);
        }
      }
    );

  }

}
