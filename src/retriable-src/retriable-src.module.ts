import { NgModule } from '@angular/core';

import { RetriableSrcDirective } from './retriable-src.directive';

@NgModule({
  declarations: [ RetriableSrcDirective ],
  exports: [ RetriableSrcDirective ],
})
export class NgxRetriableModule { }
