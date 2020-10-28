import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../services/products.service';
import {ConfigService} from '../../../services/config.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-related-product',
  templateUrl: './related-product.component.html',
  styleUrls: ['./related-product.component.css']
})
export class RelatedProductComponent implements OnInit {


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

    this.activatedRoute.params.subscribe(
      (params) => {
        this.loading = true;
        if (params.param) {
          this.urlProduct = params.param;


          this._productService.getFilterData('url', this.urlProduct).subscribe(
            (response: any) => {

              this._productService.getFilterData('category', (Object.values(response)[0] as any).category).subscribe(
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

  orderPorductsBySells(products: Array<any>): Array<any> {
    const productsOrderBySales = products.sort((a, b) => {
      return (b.views - a.views);
    });
    return productsOrderBySales;
  }

}
