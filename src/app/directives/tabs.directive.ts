import {Directive, Input} from '@angular/core';
import {tabs} from '../utilities';

@Directive({
  selector: '[appTabs]'
})
export class TabsDirective {

  @Input('appTabs') appTabs: boolean;
  @Input('classTabs') classTabs: string;

  ngOnInit(): void {
    this.setUp();
  }

  setUp() {
    // Si es el ulitmo en iterar
    if (this.appTabs) {
      // Activara la funcionalidad jquery
      tabs();
    }
  }

}
