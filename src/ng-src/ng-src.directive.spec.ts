import { Component, DebugElement } from '@angular/core';

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgSrcDirective } from './ng-src.directive';
import { NgSrcModule } from './ng-src.module';

@Component({
  template: `
    <img [ngSrc]="imageSource"
         (ngOnLoad)="imageLoaded($event)"
         >
  `
})
class TestHostComponent {
  imageSource = 'http://localhost:4200/demo/assets/cat300.jpg';

  imageLoaded(request: XMLHttpRequest) {
    console.log(request.getAllResponseHeaders());
  }
}

describe('ng-src directive', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let componentInstance: TestHostComponent;
  let directiveElement: DebugElement;
  let directiveInstance: NgSrcDirective;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [NgSrcModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    componentInstance = fixture.componentInstance;

    directiveElement = fixture.debugElement.query(By.directive(NgSrcDirective));
    directiveInstance = directiveElement.injector.get(NgSrcDirective);

    spyOn(componentInstance, 'imageLoaded');
  });

  it('should create an instance', () => {
    const directive = new NgSrcDirective(null);

    expect(directive).toBeDefined();
  });

  it('can be attached to component', () => {
    expect(fixture).toBeDefined();
    expect(componentInstance).toBeDefined();

    expect(directiveElement).toBeDefined();
    expect(directiveInstance).toBeDefined();
  });

  xit('will load image', () => {
    expect(directiveElement.nativeElement.src).toBe(componentInstance.imageSource);
  });

  xit('will trigger loaded event', () => {
    expect(componentInstance.imageLoaded).toHaveBeenCalled();
  });
});
