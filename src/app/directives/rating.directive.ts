import {Directive, Input, OnInit} from '@angular/core';
import {rating} from '../utilities';

@Directive({
  selector: '[appRating]'
})
export class RatingDirective implements OnInit{

  @Input('appRating') appRating: boolean;
  @Input('classRating') classRating: string;

  ngOnInit(): void {
    this.setUp();
  }

  setUp() {
    // Si es el ulitmo en iterar
    if (this.appRating) {
      // Activara la funcionalidad jquery
      setTimeout(() => {
        rating('.' + this.classRating);
      }, 100);
    }
  }

}
