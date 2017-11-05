import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgSrcModule } from '../../ng-src/ng-src.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgSrcModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
