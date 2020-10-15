import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../../../services/config.service';
import {ProductsService} from '../../../services/products.service';

@Component({
  selector: 'app-home-promotions',
  templateUrl: './home-promotions.component.html',
  styleUrls: ['./home-promotions.component.css']
})
export class HomePromotionsComponent implements OnInit {
  banner_promotions: Array<any>;
  render: boolean;
  preload: boolean;

  constructor(public _configService: ConfigService,
              private _productService: ProductsService) {

    this.banner_promotions = [];
    this.render = true;
    this.preload = false;
  }

  ngOnInit(): void {

    this.preload = true;
    this._productService.getData().subscribe(
      (response) => {

        // Obtener la longitud del objeto
        const size_response = Object.values(response).length;

        // Si hay mas de 2 productos en BD
        if (size_response > 2) {
          // Obtener un numero aletaroio entre 0 y la cantidad de elementos
          const index_ramdom = Math.floor(Math.random() * (size_response - 2));
          // de objeto a array con indices numericos
          const object_to_array = Object.values(response);
          // Cortando el arreglo para retornar solo 5 slides
          const slides = object_to_array.slice(index_ramdom, (index_ramdom + 2));

          // Pusehando los el objeto parseado al slides global
          slides.forEach((slide: any) => {

            slide.horizontal_slider = JSON.parse(slide.horizontal_slider);

            this.banner_promotions.push(slide);

          });

          // console.log("this.banner_promotions", this.banner_promotions);

          this.preload = false;
        }

      }
    );
  }

}
