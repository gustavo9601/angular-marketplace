import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-breadcrumb',
  templateUrl: './search-breadcrumb.component.html',
  styleUrls: ['./search-breadcrumb.component.css']
})
export class SearchBreadcrumbComponent implements OnInit {

  breadCrumb: string;

  constructor(private activateRoute:ActivatedRoute) {
    this.breadCrumb = '';
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      (params) => {
        if (params.param){
          this.breadCrumb = params.param.replace(/[_]/g, " ");
        }
      }
    )
  }

}
