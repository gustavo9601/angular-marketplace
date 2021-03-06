import {Component,  OnInit} from '@angular/core';
import {ConfigService} from '../../../services/config.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsService} from '../../../services/products.service';

@Component({
  selector: 'app-product-left',
  templateUrl: './product-left.component.html',
  styleUrls: ['./product-left.component.css']
})
export class ProductLeftComponent implements OnInit {

  urlProduct: string;
  product: any;
  loading: boolean;
  quantity: number;


  constructor(public _configService: ConfigService,
              private _productService: ProductsService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.urlProduct = '';
    this.product = null;
    this.loading = false;

  }

  ngOnInit(): void {

    this.loading = true;
    this.activatedRoute.params.subscribe(
      (params) => {
        this.quantity = 1;
        if (params.param) {
          this.urlProduct = params.param;
          this._productService.getFilterData('url', this.urlProduct).subscribe(
            (response) => {
              const products = Object.values(response);
              // Si retorna datos
              if (products.length > 0) {
                this.product = this.mapProducts(products)[0];
                this.loading = false;
              }
            }
          );
        }
      }
    );
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
      product.video = JSON.parse(product.video);
      product.calculate_review = this.calculateReview(product.reviews);
      product.tags = product.tags.split(',');
      product.offer[2] = new Date(Date.parse(product.offer[2]));  // parseando el string a un tipo fecha
    });
    return formatProducts;
  }


  quantityChange() {
    if (this.quantity >= this.product.stock) {
      this.quantity = 1;
    }
    if (this.quantity < 1) {
      this.quantity = 1;
    }
  }

}
