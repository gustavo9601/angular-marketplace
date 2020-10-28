import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../../../services/config.service';
import {CategoriesService} from '../../../services/categories.service';
import {SubCategoriesService} from '../../../services/sub-categories.service';
import {ProductsService} from '../../../services/products.service';
import {carouselNavigation, owlCarouselConfig, rating} from '../../../utilities';

@Component({
  selector: 'app-home-show-case',
  templateUrl: './home-show-case.component.html',
  styleUrls: ['./home-show-case.component.css']
})
export class HomeShowCaseComponent implements OnInit {
  categoriesTop: Array<any>;
  loading: boolean;
  renderSlideVertical: boolean;

  constructor(public _configService: ConfigService,
              private _categoriesService: CategoriesService,
              private _subCategoriesService: SubCategoriesService,
              private _productsService: ProductsService) {
    this.categoriesTop = [];
    this.loading = false;
    this.renderSlideVertical = true;
  }

  ngOnInit(): void {
    this.loading = true;
    this._categoriesService.getData().subscribe(
      (response) => {
        let categories = Object.values(response);


        // Ordenando por vistas
        // Ordenando arreglo por indice view de mayor a menor
        categories.sort((a, b) => {
          return b.view - a.view;
        });

        // Si el arreglo es mayor a 6 posciiones lo cortams a 6
        categories = (categories.length > 6) ? categories.slice(0, 6) : categories;

        // Trayendo para cada categoria sus subcategorias y los productos para categoria
        categories.map((category) => {
          // Sub categorias
          this._subCategoriesService.getFilterData('category', category.name).subscribe(
            (responseSubCategory) => {
              // Añadiendole por cada iteracion al categories, sus subcategorias
              category.subcategories = Object.values(responseSubCategory);
            }
          );
          // Products
          this._productsService.getFilterAndLimitDate(category.url, 6).subscribe(
            (responseProducts) => {
              category.products = Object.values(responseProducts);

              // Añadiendole al producto el product reviews
              category.products.map((productReview) => {
                productReview.calculate_review = this.calculateReview(JSON.parse(productReview.reviews));
                productReview.offer = JSON.parse(productReview.offer);
              });


            }
          );
        });


        this.categoriesTop = categories;


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

}
