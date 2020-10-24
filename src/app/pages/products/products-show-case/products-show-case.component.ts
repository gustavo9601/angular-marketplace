import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../../../services/config.service';
import {ProductsService} from '../../../services/products.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-products-show-case',
  templateUrl: './products-show-case.component.html',
  styleUrls: ['./products-show-case.component.css']
})
export class ProductsShowCaseComponent implements OnInit {

  products: Array<any>;
  loading: boolean;
  order: string;
  paramUrl: any;

  optionsOrderSelect: Array<any>;


  currentPage: number;
  itemsPerPage: number;

  constructor(public _configService: ConfigService,
              private _productService: ProductsService,
              private activateRoute: ActivatedRoute,
              private router: Router) {
    this.products = [];
    this.loading = false;
    this.order = '';
    this.paramUrl = {};

    this.optionsOrderSelect = [
      {value: 'latest', text: 'Sort by latest'},
      {value: 'popularity', text: 'Sort by popularity'},
      {value: 'low', text: 'Sort by price: low'},
      {value: 'high', text: 'Sort by price: high'},
    ];

    this.currentPage = 1;
    this.itemsPerPage = 6;


  }

  ngOnInit(): void {

    this.activateRoute.params.subscribe(
      (params) => {
        console.log('params', params);
        this.paramUrl = params;
        this.filterData(params);
      }
    );

    this.activateRoute.queryParams.subscribe(
      (queryParams) => {
        if (queryParams.order) {
          console.log('queryParams', queryParams);
          this.order = queryParams.order;
          this.filterData(this.paramUrl);
        }
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

          this.products = this.mapProducts(this.orderProductsFilter(productsCategory));
          console.log(' this.products category', this.products);
          this.loading = false;
        } else {

          // Si no existe por categoria, consultamos por subcategoria
          this._productService.getFilterData('sub_category', params.param).subscribe(
            (responseSubcategoryFiltered) => {

              const productsSubCategory = Object.values(responseSubcategoryFiltered);
              if (productsSubCategory.length > 0) {

                this.products = this.mapProducts(this.orderProductsFilter(productsSubCategory));
                console.log(' this.products subcategory', this.products);
              }
              this.loading = false;
            }
          );

        }
      }
    );
  }


  orderProductsType(products: Array<any>, type: string, order: string = 'low'): Array<any> {
    const productsOrdered = products.sort((a, b) => {
      return (order === 'low') ? (a[type] - b[type]) : (b[type] - a[type]);
    });
    return productsOrdered;
  }

  orderProductsFilter(products: Array<any>): Array<any> {
    switch (this.order) {
      case 'latest':
        return this.orderProductsType(products, 'date_created');
        break;
      case 'popularity':
        return this.orderProductsType(products, 'views');
        break;
      case 'low':
        return this.orderProductsType(products, 'price', 'low');
        break;
      case 'high':
        return this.orderProductsType(products, 'price', 'high');
        break;
      default:
        return this.orderProductsType(products, 'date_created', 'high');
        break;
    }
  }


  sliceProducts(products: Array<any>): Array<any> {
    if (products.length > 6) {
      return products.slice(0, 6);
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
    const formatProducts = products;
    formatProducts.map((product: any) => {
      product.offer = JSON.parse(product.offer);
      product.offer[1] = Number(product.offer[1]);
      product.gallery = JSON.parse(product.gallery);
      product.reviews = JSON.parse(product.reviews);
      product.calculate_review = this.calculateReview(product.reviews);
      product.offer[2] = new Date(Date.parse(product.offer[2]));  // parseando el string a un tipo fecha
    });
    return formatProducts;
  }

  orderProductsSelect($event) {
    console.log('$event', $event);
    this.order = $event;
    this.router.navigate(['products', this.paramUrl.param], {queryParams: {order: this.order}});
  }

}
