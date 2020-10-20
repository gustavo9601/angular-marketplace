import {Directive, Input, OnInit} from '@angular/core';
import {rating, slickConfig} from '../utilities';

@Directive({
  selector: '[appSlick]'
})
export class SlickDirective implements OnInit{


  @Input('appSlick') appSlick: boolean;
  @Input('classSlick') classSlick: string;

  ngOnInit(): void {
    this.setUp();
  }

  setUp() {
    // Si es el ulitmo en iterar
    if (this.appSlick) {
      // Activara la funcionalidad jquery
      setTimeout(() => {
        slickConfig('.' + this.classSlick);
      }, 100);
    }
  }

}
