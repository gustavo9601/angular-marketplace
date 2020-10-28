import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from '../../../services/products.service';

@Component({
  selector: 'app-product-breadcrumb',
  templateUrl: './product-breadcrumb.component.html',
  styleUrls: ['./product-breadcrumb.component.css']
})
export class ProductBreadcrumbComponent implements OnInit {

  breadCrumb: string;

  constructor(private activateRoute: ActivatedRoute,
              private _productService: ProductsService) {
    this.breadCrumb = '';
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(
      (params) => {
        if (params.param) {
          this.breadCrumb = params.param.replace(/[-]/g, ' ');


          // Obtiene el producto, accede a los views y le suma +1
          this._productService.getFilterData('url', params.param).subscribe(
            (response) => {
              const product = Object.values(response);
              const idProduct = Object.keys(response)[0];
              this._productService.patchData(idProduct, {views: this.setViews(product)}).subscribe();
            }
          );
        }
      }
    );
  }

  setViews(item: Array<any>, quatityAdd: number = 1) {
    return Number(item[0].views) + quatityAdd;
  }
}
