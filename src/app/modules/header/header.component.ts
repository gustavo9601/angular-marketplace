import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../../services/config.service';
import {CategoriesService} from '../../services/categories.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: Object;

  constructor(public _configService: ConfigService,
              private _categoriesService:CategoriesService) {
    this.categories = {};
  }

  ngOnInit(): void {
    this._categoriesService.getData().subscribe(
      (response) => {
        console.log("response categories", response);
        this.categories = response;


        /*
        * Recorrer la coleccion de categorias para tomar la lista de titulos
        * */


      }
    )
  }

}
