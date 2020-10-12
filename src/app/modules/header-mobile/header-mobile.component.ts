import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from '../../services/config.service';

declare var $: any;


@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.css']
})
export class HeaderMobileComponent implements OnInit {

  @Input('categories') categories: Object;

  constructor(public _configService: ConfigService) {
  }

  ngOnInit(): void {
    this.fixToogleMenuMobile();
  }

  fixToogleMenuMobile(){
    // Activando efecto tootle del menu mobile
    $(document).on('click', '.sub-toggle', function() {
      $(this).parent().children('ul').toggle();
    });
  }

}
