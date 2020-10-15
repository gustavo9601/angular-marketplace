import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../../../services/config.service';
import {ProductsService} from '../../../services/products.service';
import {owlCarouselConfig, backgroundImage} from '../../../utilities';

@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.css']
})
export class HomeBannerComponent implements OnInit {

  banner_home: Array<any>;
  render: boolean;
  preload:boolean;


  constructor(public _configService: ConfigService,
              private _productService: ProductsService) {

    this.banner_home = [];
    this.render = true;
    this.preload = false;
  }

  ngOnInit(): void {

    this.preload = true;
    this._productService.getData().subscribe(
      (response) => {

        // Obtener la longitud del objeto
        const size_response = Object.values(response).length;

        // Si hay mas de 5 productos en BD
        if (size_response > 5) {
          // Obtener un numero aletaroio entre 0 y la cantidad de elementos
          const index_ramdom = Math.floor(Math.random() * (size_response - 5));
          // de objeto a array con indices numericos
          const object_to_array = Object.values(response);
          // Cortando el arreglo para retornar solo 5 slides
          const slides = object_to_array.slice(index_ramdom, (index_ramdom + 5));

          // Pusehando los el objeto parseado al slides global
          slides.forEach((slide: any) => {

            slide.horizontal_slider = JSON.parse(slide.horizontal_slider);

            this.banner_home.push(slide);

          });

          this.preload = false;
        }


      }
    );

  }

  callBack() {
    if (this.render) {
      // Se cambia de estado para que no se siga iterando la logica
      this.render = false;

      // Activando de nuevo el carusel
      owlCarouselConfig();
      backgroundImage();
    }
  }

}
