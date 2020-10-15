import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../../services/config.service';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'app-header-promotion',
  templateUrl: './header-promotion.component.html',
  styleUrls: ['./header-promotion.component.css']
})
export class HeaderPromotionComponent implements OnInit {

  top_banner: Object;
  category: Object;
  preload: boolean;

  constructor(public _configService: ConfigService,
              private _productsService: ProductsService) {
    this.top_banner = {};
    this.category = null;
    this.preload = false;
  }

  ngOnInit(): void {
    this.preload = true;
    this._productsService.getData().subscribe(
      (response) => {

        // Obtener la longitud del objeto
        const size_response = Object.values(response).length;
        // Obtener un numero aletaroio entre 0 y la cantidad de elementos
        const index_ramdom = Math.floor(Math.random() * size_response);

        // Seteando el key del objeto devuelto en base al indice random y parseandolo
        this.top_banner = JSON.parse(response[Object.keys(response)[index_ramdom]].top_banner);
        // console.log(' this.topBanner', this.top_banner);


        // console.log("object", response[0][Object.keys(response[0])[index_ramdom]].category);

        this.category = response[Object.keys(response)[index_ramdom]].category;
        // console.log("this.category", this.category);

        this.preload = false;
      }
    );
  }


}
