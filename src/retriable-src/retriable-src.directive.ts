import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  HostBinding,
  ViewContainerRef,
} from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngSrc]'
})
export class RetriableSrcDirective implements OnChanges {
  @Input() ngSrc;

  constructor(private view: ViewContainerRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchImage(this.ngSrc);
  }

  fetchImage(url: string) {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open('GET', url, true);
    httpRequest.responseType = 'arraybuffer';
    httpRequest.onload = this.onRequestLoaded.bind(this);

    httpRequest.send();
  }

  onRequestLoaded(ev: ProgressEvent): any {
    console.log('Response: ', ev);
    const request = ev.target as XMLHttpRequest;

    const arrayBufferView = new Uint8Array(request.response);
    const blob = new Blob([ arrayBufferView ], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);

    const imageTag = this.view.element.nativeElement as HTMLImageElement;
    imageTag.src = imageUrl;

    // To read headers for example...
    // request.getResponseHeader()
  }
}
