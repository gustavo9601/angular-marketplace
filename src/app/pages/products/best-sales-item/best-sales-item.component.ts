import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../../../services/config.service';
import {ProductsService} from '../../../services/products.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-best-sales-item',
  templateUrl: './best-sales-item.component.html',
  styleUrls: ['./best-sales-item.component.css']
})
export class BestSalesItemComponent implements OnInit {

  products: Array<any>;
  loading: boolean;

  constructor(public _configService: ConfigService,
              private _productService: ProductsService,
              private activateRoute: ActivatedRoute) {

    this.products = [];
    this.loading = false;
  }

  ngOnInit(): void {

    this.activateRoute.params.subscribe(
      (params) => {
        this.filterData(params);
      }
    );

  }


  filterData(params) {
    this.loading = true;
    this._productService.getFilterData('category', params.param).subscribe(
      (responseFiltered) => {
        const productsCategory = Object.values(responseFiltered);
        // Si retorna datos
        if (productsCategory.length > 0) {
          this.products = this.mapProducts(this.sliceProducts(this.orderPorductsBySales(productsCategory)));
          console.log(' this.products', this.products);
          this.loading = false;
        } else {

          // Si no existe por categoria, consultamos por subcategoria
          this._productService.getFilterData('sub_category', params.param).subscribe(
            (responseSubcategoryFiltered) => {

              const productsSubCategory = Object.values(responseSubcategoryFiltered);
              if (productsSubCategory.length > 0) {
                this.products = this.mapProducts(this.sliceProducts(this.orderPorductsBySales(productsSubCategory)));
                console.log(' this.products', this.products);
              }
              this.loading = false;
            }
          );

        }
      }
    );
  }


  orderPorductsBySales(products: Array<any>): Array<any> {
    const productsOrderBySales = products.sort((a, b) => {
      return (b.sales - a.sales);
    });
    return productsOrderBySales;
  }

  sliceProducts(products: Array<any>): Array<any> {
    if (products.length > 10) {
      return products.slice(0, 10);
    }
    return products;
  }

  calculateReview(reviews: Array<any>) {
    let sum = 0;
    reviews.forEach((reviewProduct) => {
      sum += reviewProduct.review;
    });
    return Math.round(sum / reviews.length);
  }

  mapProducts(products: Array<any>): Array<any> {

    console.log("products before", products);
    const productedita = products.map((product: any) => {
      product.offer = JSON.parse(product.offer);
      product.offer[1] = Number(product.offer[1]);
      product.gallery = JSON.parse(product.gallery);
      product.reviews = JSON.parse(product.reviews);

      product.calculate_review = this.calculateReview(product.reviews);

      product.offer[2] = new Date(Date.parse(product.offer[2]));  // parseando el string a un tipo fecha
    });


    return productedita;
  }

}
