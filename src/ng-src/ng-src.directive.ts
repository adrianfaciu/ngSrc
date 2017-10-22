import {
  Directive,
  Input,
  OnChanges,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngSrc]'
})
export class NgSrcDirective implements OnChanges {
  @Input() ngSrc: string;

  constructor(private view: ViewContainerRef) { }

  ngOnChanges(): void {
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
    const request = ev.target as XMLHttpRequest;

    const arrayBufferView = new Uint8Array(request.response);
    const blob = new Blob([ arrayBufferView ], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);

    const imageTag = this.view.element.nativeElement as HTMLImageElement;
    imageTag.src = imageUrl;
  }
}
