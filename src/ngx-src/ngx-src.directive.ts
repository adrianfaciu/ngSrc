import {
  Directive,
  Input,
  OnChanges,
  ViewContainerRef,
  EventEmitter,
  Output,
} from '@angular/core';

@Directive({
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

  private fetchImage(url: string) {
    const httpRequest = new XMLHttpRequest();

    httpRequest.open('GET', url, true);
    httpRequest.responseType = 'arraybuffer';
    httpRequest.onload = this.onRequestLoaded.bind(this);

    httpRequest.send();
  }

  private onRequestLoaded(ev: ProgressEvent): any {
    const request = ev.target as XMLHttpRequest;

    const imageUrl = this.createLocalResource(request);
    this.setImageSource(imageUrl);

    this.ngxOnLoad.emit(request);
  }

  private createLocalResource(request: XMLHttpRequest) {
    const arrayBufferView = new Uint8Array(request.response);
    const blob = new Blob([ arrayBufferView ], { type: this.getContentType(request) });

    return URL.createObjectURL(blob);
  }

  private setImageSource(url: string) {
    this.hostImage.src = url;
  }

  private getContentType(request: XMLHttpRequest) {
    return request.getResponseHeader('content-type');
  }
}
