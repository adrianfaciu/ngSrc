import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxRetriableModule } from '../../retriable-src/retriable-src.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgxRetriableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
