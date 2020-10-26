import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-breadcrumb',
  templateUrl: './product-breadcrumb.component.html',
  styleUrls: ['./product-breadcrumb.component.css']
})
export class ProductBreadcrumbComponent implements OnInit {

  breadCrumb: string;

  constructor(private activateRoute:ActivatedRoute) {
    this.breadCrumb = '';
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      (params) => {
        if (params.param){
          this.breadCrumb = params.param.replace(/[-]/g, " ");
        }
      }
    )
  }
}
