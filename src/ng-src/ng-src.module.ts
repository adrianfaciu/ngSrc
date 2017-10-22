import { NgModule } from '@angular/core';

import { NgSrcDirective } from './ng-src.directive';

@NgModule({
  declarations: [ NgSrcDirective ],
  exports: [ NgSrcDirective ],
})
export class NgSrcModule { }
