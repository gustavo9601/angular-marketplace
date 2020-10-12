import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from '../../services/config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Input('categories') categories: Object;

  constructor(public _configService: ConfigService) {
  }

  ngOnInit(): void {
  }

}
