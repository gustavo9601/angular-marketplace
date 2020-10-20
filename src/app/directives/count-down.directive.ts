import {Directive, Input, OnInit} from '@angular/core';
import {countDown} from '../utilities';

@Directive({
  selector: '[appCountDown]'
})
export class CountDownDirective implements OnInit{

  @Input('appCountDown') appCountDown: boolean;
  @Input('classCountDown') classCountDown: string;

  ngOnInit(): void {
    this.setUp();
  }

  setUp() {
    // Si es el ulitmo en iterar
    if (this.appCountDown) {
      // Activara la funcionalidad jquery
      setTimeout(() => {
        countDown('.' + this.classCountDown);
      }, 100)
    }
  }

}
