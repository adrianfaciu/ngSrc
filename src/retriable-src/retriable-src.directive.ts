import { Directive } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[retriableSrc]'
})
export class RetriableSrcDirective {

  constructor() { }

}
