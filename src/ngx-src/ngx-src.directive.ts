import {
  Directive,
  Input,
  OnChanges,
  ViewContainerRef,
  EventEmitter,
  Output,
} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngxSrc]img'
})
export class NgxSrcDirective implements OnChanges {
  @Input() ngxSrc: string;

  @Output() ngxOnLoad = new EventEmitter<XMLHttpRequest>();

  get hostImage(): HTMLImageElement {
    return this.view.element.nativeElement;
  }

  constructor(private view: ViewContainerRef) { }

  ngOnChanges(): void {
    this.fetchImage(this.ngxSrc);
  }

  fetchImage(url: string) {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open('GET', url, true);
    httpRequest.responseType = 'arraybuffer';
    httpRequest.onload = this.onRequestLoaded.bind(this);

    httpRequest.send();
  }

  private onRequestLoaded(ev: ProgressEvent): any {
    const request = ev.target as XMLHttpRequest;

    const arrayBufferView = new Uint8Array(request.response);
    const blob = new Blob([ arrayBufferView ], { type: this.getContentType(request) });
    const imageUrl = URL.createObjectURL(blob);

    this.hostImage.src = imageUrl;

    this.ngxOnLoad.emit(request);
  }

  private getContentType(request: XMLHttpRequest) {
    return request.getResponseHeader('content-type');
  }
}
