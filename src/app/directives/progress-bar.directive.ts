import {Directive, Input, OnInit} from '@angular/core';
import {progressBar} from '../utilities';

@Directive({
  selector: '[appProgressBar]'
})
export class ProgressBarDirective implements OnInit {

  @Input('appProgressBar') appProgressBar: boolean;
  @Input('classProgressBar') classProgressBar: string;

  ngOnInit(): void {
    this.setUp();
  }

  setUp() {
    // Si es el ulitmo en iterar
    if (this.appProgressBar) {
      // Activara la funcionalidad jquery
      setTimeout(() => {
        progressBar('.' + this.classProgressBar);
      }, 100);
    }
  }

}
