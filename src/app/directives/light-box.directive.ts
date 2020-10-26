import {Directive, Input, OnInit} from '@angular/core';
import {productLightbox} from '../utilities';

@Directive({
  selector: '[appLightBox]'
})
export class LightBoxDirective implements OnInit {

  @Input('appLightBox') appLightBox: boolean;
  @Input('classLightBox') classLightBox: string;

  ngOnInit(): void {
    this.setUp();
  }

  setUp() {
    // Si es el ulitmo en iterar
    if (this.appLightBox) {
      // Activara la funcionalidad jquery
      setTimeout(() => {
        productLightbox('.' + this.classLightBox);
      }, 100);
    }
  }

}
