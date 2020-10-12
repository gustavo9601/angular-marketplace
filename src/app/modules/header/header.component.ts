import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ConfigService} from '../../services/config.service';
import {CategoriesService} from '../../services/categories.service';
import {SubCategoriesService} from '../../services/sub-categories.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  categories: Object;

  @Output() categories_emit = new EventEmitter<any>();

  constructor(public _configService: ConfigService,
              private _categoriesService: CategoriesService,
              private _subCategoriesService: SubCategoriesService) {
    this.categories = null;
  }

  ngOnInit(): void {

    const self = this;

    this._categoriesService.getData().subscribe(
      (response) => {
        // console.log('response categories', response);


        this.categories = response;

        // Separando title_list strinf to array
        (this.categories as Array<string>).map((category: any) => {
          category.title_list_items = this.generateObjectSubCategories(JSON.parse(category.title_list));
        });

        // Enviando la informacion optenida al padre para ser distribuida en los otros componentes
        this.emitCategoriesParent()
        console.log('this.categories_updated', this.categories);
      }
    );
  }

  generateObjectSubCategories(title_list_items: Array<string>) {
    const items = [];

    // Recorriendo cada titulo del array
    title_list_items.forEach((title) => {
      // Obnteniendo las categories
      this._subCategoriesService.getFilterData('title_list', title).subscribe(
        (response) => {
          const item = {
            title: title,
            sub_categories: Object.values(response)  // Obteniendolo el objeto en formato array
          };
          items.push(item);
        }
      );

    });

    return items;
  }

  emitCategoriesParent() {
    this.categories_emit.emit(this.categories);
  }

}
