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
    if (this.validateUrl(this.sourceUrl)) {
      this.fetchImage(this.sourceUrl);
    }
  }

  validateUrl(url: string) {
    // todo validate the url
    return true;
  }

  fetchImage(url: string) {
    console.log(url);

    const httpRequest = new XMLHttpRequest();

    httpRequest.open('GET', url, true);
    httpRequest.responseType = 'arraybuffer';
    httpRequest.onload = this.onRequestLoaded;

    httpRequest.send();
  }

  onRequestLoaded(ev: ProgressEvent): any {
    console.log('Response: ', ev);
    const request = ev.target as XMLHttpRequest;

    const arrayBufferView = new Uint8Array(request.response);
    const blob = new Blob([ arrayBufferView ], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);

    this.imgSrc = imageUrl;

    // Get the description from S3 metadata
    // var desc = this.getResponseHeader('x-amz-meta-description');
    // img.setAttribute('data-description', desc);
  }
}


// Handle case when sourceUrl is not an URl

// Should we load with XMLHttpRequest in order not to depend on HttpClient
// Might make this optional and inject HttpClient or other service ?

// Four spaces instead of two
