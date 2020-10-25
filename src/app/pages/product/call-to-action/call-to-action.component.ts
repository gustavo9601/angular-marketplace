import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../../../services/config.service';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from '../../../services/products.service';

@Component({
  selector: 'app-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.css']
})
export class CallToActionComponent implements OnInit {

  urlProduct: string;
  product:any;

  constructor(public _configService: ConfigService,
              private activatedRoute: ActivatedRoute,
              private _productsService: ProductsService) {
    this.urlProduct = '';
    this.product = null;

  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      (params) => {
        if (params.param) {
          this.urlProduct = params.param;

          this._productsService.getFilterData('url', this.urlProduct).subscribe(
            (productFilter) => {
              console.log('productFilter', productFilter);

              const products = Object.values(productFilter);

              // Recorrer los productos para obtener solo los que tienen ofertas y tienen stock
              // Parseando en el arreglo el indice offer a array
              products.map((product: any) => {
                product.offer = JSON.parse(product.offer);
                product.offer[1] = Number(product.offer[1]);
                product.gallery = JSON.parse(product.gallery);
                product.reviews = JSON.parse(product.reviews);

                product.calculate_review = this.calculateReview(product.reviews);

                product.offer[2] = new Date(Date.parse(product.offer[2]));  // parseando el string a un tipo fecha
              });

              this.product = products[0];
              console.log("this.product", this.product);

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


}
