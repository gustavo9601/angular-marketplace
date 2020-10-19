import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../../services/config.service';
import {CategoriesService} from '../../services/categories.service';

@Component({
  selector: 'app-home-top-categories',
  templateUrl: './home-top-categories.component.html',
  styleUrls: ['./home-top-categories.component.css']
})
export class HomeTopCategoriesComponent implements OnInit {

  categoriesTop: Array<any>;
  loading:boolean;

  constructor(public _configService: ConfigService,
              private _categoriesService: CategoriesService) {
    this.categoriesTop = [];
    this.loading = false;
  }

  ngOnInit(): void {
    this.loading = true;
    this._categoriesService.getData().subscribe(
      (response) => {
        const categories = Object.values(response);


        // Ordenando por vistas
        // Ordenando arreglo por indice view de mayor a menor
        categories.sort((a, b) => {
          return b.view - a.view;
        });

        // Si el arreglo es mayor a 6 posciiones lo cortams a 6
        this.categoriesTop = (categories.length > 6) ? categories.slice(0, 6) : categories;

        this.loading = false;
      }
    );
  }

}
