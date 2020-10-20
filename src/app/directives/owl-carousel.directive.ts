import {Directive, ElementRef, Input, OnInit} from '@angular/core';

import {carouselNavigation, owlCarouselConfig} from '../utilities';

@Directive({
  selector: '[appOwlCarousel]'
})
export class OwlCarouselDirective implements OnInit{

  @Input('appOwlCarousel') appOwlCarousel: boolean;
  @Input('classOwlCarousel') classOwlCarousel: string;

  constructor(private elemento: ElementRef) {

  }

  ngOnInit(): void {
    this.setUpOwlCarousel();
  }

  setUpOwlCarousel(){
    // Si es el ulitmo en iterar
    if (this.appOwlCarousel){
      // Activara el slide para la clase
      owlCarouselConfig('.' + this.classOwlCarousel);
      carouselNavigation('.' + this.classOwlCarousel);
    }
  }

}
