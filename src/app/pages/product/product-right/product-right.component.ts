import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../../../services/config.service';

@Component({
  selector: 'app-product-right',
  templateUrl: './product-right.component.html',
  styleUrls: ['./product-right.component.css']
})
export class ProductRightComponent implements OnInit {

  constructor(public _configService:ConfigService) { }

  ngOnInit(): void {
  }

}
