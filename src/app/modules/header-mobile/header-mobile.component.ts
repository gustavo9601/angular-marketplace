import {Component, Input, OnInit} from '@angular/core';
import {ConfigService} from '../../services/config.service';
import {Router} from '@angular/router';
import {validateSearch} from '../../utilities';

declare var $: any;


@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.css']
})
export class HeaderMobileComponent implements OnInit {

  @Input('categories') categories: Object;

  constructor(public _configService: ConfigService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.fixToogleMenuMobile();
  }

  fixToogleMenuMobile() {
    // Activando efecto tootle del menu mobile
    $(document).on('click', '.sub-toggle', function() {
      $(this).parent().children('ul').toggle();
    });
  }


  goSearch(value: string) {
    if (value.length > 0 && validateSearch(value)) {
      this.router.navigate(['/search', validateSearch(value)]);
    }
    return false;
  }

}
