import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {

  @Input() rating:number=0;
  public defaultValue: number = 0;

  constructor(){
    this.rating  = this.defaultValue;
  }

  get stars() {
    return Array(Math.floor(this.rating)).fill(0);
  }

  public setRating(value: number){
    this.rating = value;
  }

}
