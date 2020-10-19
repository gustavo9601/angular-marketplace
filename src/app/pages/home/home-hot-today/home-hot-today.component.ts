import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../../../services/config.service';
import {ProductsService} from '../../../services/products.service';

import {carouselNavigation, countDown, owlCarouselConfig, productLightbox, progressBar, rating, slickConfig} from '../../../utilities';
import {SalesService} from '../../../services/sales.service';

@Component({
  selector: 'app-home-hot-today',
  templateUrl: './home-hot-today.component.html',
  styleUrls: ['./home-hot-today.component.css']
})
export class HomeHotTodayComponent implements OnInit {


  productsAvailableStockPromotion: Array<any>;
  productsInfo: Array<any>;
  productsBestSeller: Array<any>;
  render: boolean;
  renderBestSeller: boolean;
  preload: boolean;

  constructor(public _configService: ConfigService,
              private _productService: ProductsService,
              private _salesService: SalesService) {
    this.productsAvailableStockPromotion = [];
    this.productsInfo = [];
    this.productsBestSeller = [];
    this.render = true;
    this.renderBestSeller = true;
    this.preload = false;
  }

  ngOnInit(): void {

    this.getProductsBanners();


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

  getProductsBanners() {

    const hoy = new Date();
    this.preload = true;
    this._productService.getData().subscribe(
      (response) => {
        // Recorrer los productos para obtener solo los que tienen ofertas y tienen stock
        const products = Object.values(response);
        // Variable que se usara para hacer el match con los products bes seller
        this.productsInfo = products;

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

        // Obteniendo los poructos vendidos
        this.getSales();

      }
    );
  }

  callbackTopBestSeller() {
    if (this.renderBestSeller) {
      this.renderBestSeller = false;
      owlCarouselConfig();
      carouselNavigation();
      rating();
    }
  }

  getSales() {
    this._salesService.getData().subscribe(
      (responseSales) => {

        const productsSales = Object.values(responseSales);

        // Ordenando arreglo por indice quantity de mayor a menor
        productsSales.sort((a, b) => {
          return b.quantity - a.quantity;
        });

        // Filtrando valores unicos del array
        const unicProductsSales = productsSales.filter((valorActual, indiceActual, arreglo) => {
          return arreglo.findIndex(valorDelArreglo => JSON.stringify(valorDelArreglo) === JSON.stringify(valorActual)) === indiceActual;
        });


        // Haciendo el buscado sobre el arreglo de products, y pusehando en el arreglo  productsFilteredToBestSeller
        const productsFilteredToBestSeller = [];
        unicProductsSales.forEach((productSale) => {
          productsFilteredToBestSeller.push(this.productsInfo.find((productInfo) => {
            return productSale.product === productInfo.name;
          }));
        });


        // El modal solo permite agrupaciones de 4 productos, por tal razon se deben agrupar
        const longitudSlideBestSeller = 4;
        for (let i = 0; i < productsFilteredToBestSeller.length; i += longitudSlideBestSeller) {
          const productsCortados = productsFilteredToBestSeller.slice(i, i + longitudSlideBestSeller);
          this.productsBestSeller.push(productsCortados);
        }
        console.log('this.productsBestSeller', this.productsBestSeller);


        // this.productsBestSeller;
      }
    );
  }


}
