[![Build Status](https://travis-ci.org/adrianfaciu/ngSrc.svg?branch=master)](https://travis-ci.org/adrianfaciu/ngSrc)

[![NPM](https://nodei.co/npm/ng-src.png?compact=true)](https://npmjs.org/package/ng-src)

# NgSrc

Small Angular directive that loads images using XHR and exposes the request.

Usefull for cases when we need to get additional information like headers set by the server.

The image is requested from the server as arraybuffer and a blob is created from the response. A local url is created with createObjectURL and this is set as src for the image tag.

## Installing

Use npm or yarn to install
```
npm install ng-src --save
```
or
```
yarn add ng-src --prod
```
## Using

Import NgSrcModule and add it to the imports array of your app module
```
import { NgSrcModule } from 'ng-src';

@NgModule({
  imports: [
    NgSrcModule,
  ],
})
export class AppModule { }
```

You now can use the ngSrc directive on image tags inside your application
```
 <img [ngSrc]="'http://localhost:4200/demo/assets/cat300.jpg'"
      (ngOnLoad)="exampleCallback($event)">
```

The directive exposes ngOnLoad event that is triggered when the image is loaded and gets as argument the XMLHttpRequest object. One can use this to get any additional information required like the headers
```
  exampleCallback(request: XMLHttpRequest) {
    console.log(request.getAllResponseHeaders());
  }
```

## Contributing

Clone this repository
```
git clone https://github.com/adrianfaciu/ngsrc
```
And install all dependencies
```
yarn install
```
or
```
npm install
```
Source code is inside src/ng-src and a demo application is found inside src/demo.

### Scripts
- ```build:lib```   - build and bundle the lib package using ng-packar
- ```serve:demo```  - serve the demo application
- ```test```        - execute the tests
- ```e2e```         - execute end to end tests
- ```lint```        - run the linter on the source code

All these scripts can be used with ```npm run scriptName``` or ```yarn scriptName```.


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/adrianfaciu/ngsrc/tags). 

## Authors

* **Adrian Faciu** - *Initial work*

See also the list of [contributors](https://github.com/adrianfaciu/ngsrc/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
