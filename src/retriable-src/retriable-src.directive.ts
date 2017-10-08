import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  HostBinding,
} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[retriableSrc]'
})
export class RetriableSrcDirective implements OnChanges {
  // tslint:disable-next-line:no-input-rename
  @Input('retriableSrc') sourceUrl;

  @HostBinding('src') imgSrc;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    this.imgSrc = this.sourceUrl;
  }
}


// Handle case when sourceUrl is not an URl

// Should we load with XMLHttpRequest in order not to depend on HttpClient
// Might make this optional and inject HttpClient or other service
