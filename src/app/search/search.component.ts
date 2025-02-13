import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  standalone: true, // this should be done for components without a module
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  searchTerm: String = "";


  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      if (params['searchTerm'])
        this.searchTerm = params['searchTerm'];
    })
  }

  search() {
    if (this.searchTerm) {
      // just route to search with the new param that was binded
      this.router.navigateByUrl('/search/' + this.searchTerm);
    }
  }

}
