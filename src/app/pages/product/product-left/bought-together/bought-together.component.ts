import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ConfigService} from '../../../../services/config.service';
import {ProductsService} from '../../../../services/products.service';

@Component({
  selector: 'app-bought-together',
  templateUrl: './bought-together.component.html',
  styleUrls: ['./bought-together.component.css']
})
export class BoughtTogetherComponent implements OnInit, OnChanges {

  @Input('product') product: any;
  chooseProducts: any;
  loading: boolean;
  totalPrice: number;

  constructor(public _configService: ConfigService,
              private _productsService: ProductsService) {
    this.chooseProducts = null;
    this.loading = false;
    this.totalPrice = 0;
  }
  ngOnInit(): void {


  }

  ngOnChanges(changes: SimpleChanges): void {
    // Se usa onChanges ,para que detecta los cambios que ocurran en el padre
    this.loading = true;
    this._productsService.getFilterData('title_list', this.product.title_list).subscribe(
      (responseData) => {
        const products = Object.values(responseData);
        // Si retorna datos
        if (products.length > 0) {
          this.chooseProducts = this.sliceProducts(this.orderPorductsByViews(this.mapProducts(products)));
        }

        this.sumProducts();
        this.loading = false;
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

  orderPorductsByViews(products: Array<any>): Array<any> {
    const productsOrderBySales = products.sort((a, b) => {
      return (b.views - a.views);
    });
    return productsOrderBySales;
  }


  sliceProducts(products: Array<any>): Array<any> {
    if (products.length > 5) {
      return products.slice(0, 5);
    }
    return products;
  }

  sumProducts() {
    let sumProducts = 0;
    this.chooseProducts.forEach((product) => {
      sumProducts +=  ((product.offer[0] === 'Disccount') ? product.price - ((product.price * product.offer[1]) / 100) : product.price - product.offer[1]);
    });
    this.totalPrice = sumProducts;
  }

}
