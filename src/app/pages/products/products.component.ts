import {Component, OnInit} from '@angular/core';
import {positionTopPage} from '../../utilities';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    positionTopPage();
  }

}
