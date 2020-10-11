import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../../services/config.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public _configService: ConfigService) {
  }

  ngOnInit(): void {
  }

}
