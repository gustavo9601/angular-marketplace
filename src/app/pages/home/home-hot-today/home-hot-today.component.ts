import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../../../services/config.service';
import {ProductsService} from '../../../services/products.service';

import {carouselNavigation, owlCarouselConfig, productLightbox, slickConfig} from '../../../utilities';

@Component({
  selector: 'app-home-hot-today',
  templateUrl: './home-hot-today.component.html',
  styleUrls: ['./home-hot-today.component.css']
})
export class HomeHotTodayComponent implements OnInit {


  productsAvailableStockPromotion: Array<any>;
  render:boolean;

  constructor(public _configService: ConfigService,
              private _productService: ProductsService) {
    this.productsAvailableStockPromotion = [];
    this.render = true;
  }

  ngOnInit(): void {


    const hoy = new Date();

    this._productService.getData().subscribe(
      (response) => {
        // Recorrer los productos para obtener solo los que tienen ofertas y tienen stock
        const products = Object.values(response[0]);

        // Parseando en el arreglo el indice offer a array
        products.map((product: any) => {
          product.offer = JSON.parse(product.offer);
          product.gallery = JSON.parse(product.gallery);
          product.offer[2] = new Date(Date.parse(product.offer[2]));  // parseando el string a un tipo fecha
        });


        // Retornando los productos filtrados que no tengan caucada la promocin y con stock
        this.productsAvailableStockPromotion = products.filter((product: any) => {
          return product.offer[2] >= hoy && product.stock > 0;
        });

        console.log("this.productsAvailableStockPromotion", this.productsAvailableStockPromotion);

      }
    );

  }

  /*Callback quye se ejecutara una ves termine de rendirazar en el vista*/
  callback(){
    // console.log("Entro a callback")
    if (this.render){
      this.render = false;
      owlCarouselConfig();
      carouselNavigation();
      slickConfig();
      productLightbox();
    }
  }


}
