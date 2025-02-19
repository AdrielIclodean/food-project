import { Component, OnInit } from '@angular/core';
import { Car } from '../shared/models/Car';
import { CarService as CarService } from '../services/car/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { TagsComponent } from "../tags/tags.component";
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart/cart.service';
import { NotFoundComponent } from "../not-found/not-found.component";

@Component({
  selector: 'app-car-page-detail',
  imports: [StarRatingComponent, TagsComponent, CommonModule, NotFoundComponent],
  templateUrl: './car-page-detail.component.html',
  styleUrl: './car-page-detail.component.css'
})
export class CarPageDetailComponent implements OnInit {
  car!: Car | null;

  constructor(private carService: CarService,
    private activateRoute: ActivatedRoute,
    private cartService: CartService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      params => {
        if (params['id'])
          this.car = this.carService.getCarById(params['id']);
      }
    )
  }

  addToCart() {
    this.cartService.addToCart(this.car);
    this.router.navigateByUrl("/cart");
  }

}
