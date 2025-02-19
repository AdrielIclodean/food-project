import { Component, Input } from '@angular/core';
import { PaginationService } from '../services/pagination.service';

@Component({
  selector: 'app-pagination-with-arrows',
  imports: [],
  templateUrl: './pagination-with-arrows.component.html',
  styleUrl: './pagination-with-arrows.component.css'
})
export class PaginationWithArrowsComponent {

  @Input()
  limit: number = 1;

  constructor(private paginationService: PaginationService
  ) { }

  nextPage() {
    this.paginationService.nextPage(this.limit);
  }

  previousPage() {
    this.paginationService.previousPage();
  }
}
