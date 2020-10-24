import {Component, OnInit} from '@angular/core';
import {CategoriesService} from '../../../services/categories.service';
import {SubCategoriesService} from '../../../services/sub-categories.service';
import {ActivatedRoute} from '@angular/router';
import {ConfigService} from '../../../services/config.service';

@Component({
  selector: 'app-products-breadcrumb',
  templateUrl: './products-breadcrumb.component.html',
  styleUrls: ['./products-breadcrumb.component.css']
})
export class ProductsBreadcrumbComponent implements OnInit {

  breadCrumb: string;

  constructor(private _categoriesService: CategoriesService,
              private _subcategoriesService: SubCategoriesService,
              private activateRoute: ActivatedRoute,
              public _configService: ConfigService) {
    this.breadCrumb = '';
  }

  ngOnInit(): void {

    this.activateRoute.params.subscribe((params) => {

      this._categoriesService.getFilterData('url', params.param).subscribe(
        (responseFiltered) => {
          const category = Object.values(responseFiltered);
          // Si retorna datos
          if (category.length > 0) {
            this.breadCrumb = category[0]['name'];
          } else {

            // Si no existe por categoria, consultamos por subcategoria
            this._subcategoriesService.getFilterData('url', params.param).subscribe(
              (resposneSucategoryFiltered) => {

                const subCategory = Object.values(resposneSucategoryFiltered);
                if (subCategory.length > 0) {
                  this.breadCrumb = subCategory[0]['name'];
                }
              }
            );
          }
        }
      );
    });

  }

}
