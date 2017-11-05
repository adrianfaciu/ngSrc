import { Component, DebugElement } from '@angular/core';

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgxSrcDirective } from './ngx-src.directive';
import { NgxSrcModule } from './ngx-src.module';

@Component({
  template: `
    <img [ngxSrc]="imageSource"
         (ngxOnLoad)="imageLoaded($event)"
         >
  `
})
class TestHostComponent {
  imageSource = 'foo.png';

  imageLoaded(request: XMLHttpRequest) {
    console.log(request.getAllResponseHeaders());
  }
}

describe('ngx-src directive', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let componentInstance: TestHostComponent;
  let directiveElement: DebugElement;
  let directiveInstance: NgxSrcDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [NgxSrcModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    componentInstance = fixture.componentInstance;

    directiveElement = fixture.debugElement.query(By.directive(NgxSrcDirective));
    directiveInstance = directiveElement.injector.get(NgxSrcDirective);
  });

  it('should create an instance', () => {
    const directive = new NgxSrcDirective(null);

    expect(directive).toBeDefined();
  });

  it('can be attached to component', () => {
    expect(fixture).toBeDefined();
    expect(componentInstance).toBeDefined();

    expect(directiveElement).toBeDefined();
    expect(directiveInstance).toBeDefined();
  });
});
