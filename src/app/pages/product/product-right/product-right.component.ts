import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../../../services/config.service';
import {ProductsService} from '../../../services/products.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-right',
  templateUrl: './product-right.component.html',
  styleUrls: ['./product-right.component.css']
})
export class ProductRightComponent implements OnInit {


  loading: boolean;
  urlProduct: string;
  products: Array<any>;

  constructor(private _productService: ProductsService,
              public _configService: ConfigService,
              private activatedRoute: ActivatedRoute) {
    this.urlProduct = '';
    this.loading = false;
    this.products = [];
  }


  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params.subscribe(
      (params) => {
        if (params.param) {
          this.urlProduct = params.param;


          this._productService.getFilterData('url', this.urlProduct).subscribe(
            (response: any) => {

              this._productService.getFilterData('store', (Object.values(response)[0] as any).store).subscribe(
                (responseStore) => {

                  const products = Object.values(responseStore);
                  // Si retorna datos
                  if (products.length > 0) {
                    this.products = this.sliceProducts(this.orderPorductsBySells(this.mapProducts(products)));
                    this.loading = false;
                  }

                }
              );


            }
          );

        }
      }
    );
  }

  mapProducts(products: Array<any>): Array<any> {
    const formatProducts = products;
    formatProducts.map((product: any) => {
      product.offer = JSON.parse(product.offer);
      product.offer[1] = Number(product.offer[1]);
      product.gallery = JSON.parse(product.gallery);
      product.reviews = JSON.parse(product.reviews);
      product.video = JSON.parse(product.video);
      product.calculate_review = this.calculateReview(product.reviews);
      product.tags = product.tags.split(',');
      product.offer[2] = new Date(Date.parse(product.offer[2]));  // parseando el string a un tipo fecha
    });
    return formatProducts;
  }

  sliceProducts(products: Array<any>): Array<any> {
    if (products.length > 2) {
      return products.slice(0, 2);
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

  orderPorductsBySells(products: Array<any>): Array<any> {
    const productsOrderBySales = products.sort((a, b) => {
      return (b.sales - a.sales);
    });
    return productsOrderBySales;
  }
}
