# NGX-CAPTURE

Screen capture library for Angular.
Define a zone and it will capture it and return a string containing a base64 PNG.

[Stackblitz Example](https://stackblitz.com/edit/ngx-capture-example)


Angular 8 > npm install ngx-capture@0.0.3-alpha
Angular 9 > npm install ngx-capture@0.0.4-beta

## Exemple 

### Install
```
npm install ngx-capture
```


```ts
import { NgModule } from '@angular/core';
import { NgxCaptureModule } from 'ngx-capture';

@NgModule({
  ...
  imports: [
    ...
    NgxCaptureModule,
  ],
})
export class AppModule {}
```

### For a full element capture, use the service:

Template side:
```html
<div #screen>
  <h1>Hey!</h1>
  <p>some content</p>
</div>
```

TS side:
```ts
import { NgxCaptureService } from 'ngx-capture';
...
@ViewChild('screen', { static: true }) screen: any;

... 

this.captureService.getImage(this.screen.nativeElement, true).then(img => {
  console.log(img);
});
```
### To access crop options, use the component

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    ...
    <ngx-capture [target]="screen" (resultImage)="saveImage($event)"></ngx-capture>
  `,
})
export class AppComponent {

  saveImage(img: string) {
    console.log(img);
  }

}
```

