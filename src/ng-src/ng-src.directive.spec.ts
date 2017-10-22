import { NgSrcDirective } from './ng-src.directive';

describe('RetriableSrcDirective', () => {
  it('should create an instance', () => {
    const directive = new NgSrcDirective(null);
    expect(directive).toBeTruthy();
  });
});
