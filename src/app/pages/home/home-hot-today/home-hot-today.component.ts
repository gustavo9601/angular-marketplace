import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../../../services/config.service';
import {ProductsService} from '../../../services/products.service';

import {carouselNavigation, countDown, owlCarouselConfig, productLightbox, progressBar, rating, slickConfig} from '../../../utilities';

@Component({
  selector: 'app-home-hot-today',
  templateUrl: './home-hot-today.component.html',
  styleUrls: ['./home-hot-today.component.css']
})
export class HomeHotTodayComponent implements OnInit {


  productsAvailableStockPromotion: Array<any>;
  render: boolean;
  preload: boolean;

  constructor(public _configService: ConfigService,
              private _productService: ProductsService) {
    this.productsAvailableStockPromotion = [];
    this.render = true;
    this.preload = false;
  }

  ngOnInit(): void {


    const hoy = new Date();
    this.preload = true;
    this._productService.getData().subscribe(
      (response) => {
        // Recorrer los productos para obtener solo los que tienen ofertas y tienen stock
        const products = Object.values(response);

        // Parseando en el arreglo el indice offer a array
        products.map((product: any) => {
          product.offer = JSON.parse(product.offer);
          product.offer[1] = Number(product.offer[1]);
          product.gallery = JSON.parse(product.gallery);
          product.reviews = JSON.parse(product.reviews);

          product.calculate_review = this.calculateReview(product.reviews);

          product.offer[2] = new Date(Date.parse(product.offer[2]));  // parseando el string a un tipo fecha
        });


        // Retornando los productos filtrados que no tengan caucada la promocin y con stock
        this.productsAvailableStockPromotion = products.filter((product: any) => {
          return product.offer[2] >= hoy && product.stock > 0;
        });

        this.preload = false;
        console.log('this.productsAvailableStockPromotion', this.productsAvailableStockPromotion);

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


  /*Callback quye se ejecutara una ves termine de rendirazar en el vista*/
  callback() {
    // console.log("Entro a callback")
    if (this.render) {
      this.render = false;
      owlCarouselConfig();
      carouselNavigation();
      slickConfig();
      productLightbox();
      countDown();
      rating();
      progressBar();
    }
  }


}
