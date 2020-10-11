import { Component, OnInit } from '@angular/core';
import {ConfigService} from '../../services/config.service';

@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.css']
})
export class HeaderMobileComponent implements OnInit {

  constructor(public _configService:ConfigService) { }

  ngOnInit(): void {
  }

}
