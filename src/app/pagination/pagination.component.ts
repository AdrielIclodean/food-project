import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

// Cannot use this component since we don't have the ability to know how many pages will be
@Component({
  selector: 'app-pagination',
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit{
  
  @Input()
  currentPage:number = 1;
  
  @Input()
  limit: number = 20;
  
  @Input()
  total: number = 0;
  
  @Output()
  changePage = new EventEmitter<number>();
  
  pages: number[] = [];
  
  ngOnInit(): void {
    let pagesCount = Math.ceil(this.total / this.limit);
    if(pagesCount == 0){
      pagesCount = 1;
    }
    this.pages = this.range(1, pagesCount);
  }

  range(start:number, end:number): number[]{
    //doing an array with numbers of the pages
    return [...Array(end).keys()].map( (el) => el + start);
  }
}
