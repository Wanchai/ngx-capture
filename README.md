# NGX-CAPTURE

Screen capture library for Angular.
Define a zone and it will capture it and return a string containing a base64 PNG.

[Stackblitz Example](https://stackblitz.com/edit/ngx-capture-example-12)

Angular 8 > `npm install ngx-capture@0.0.3-alpha`

Angular 9 > `npm install ngx-capture@0.0.4-beta`

Angular 10+ > `npm install ngx-capture`

💪 If you like this library, [you can buy me a coffee here!](https://ko-fi.com/wanchai_coding)

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

Define the screen capture area with a variable (#screen):

```html
<div #screen>
  <h1>Hey!</h1>
  <p>some content</p>
</div>
```

### For a full element capture, use the service:

```ts
import { NgxCaptureService } from 'ngx-capture';
...
@ViewChild('screen', { static: true }) screen: any;

...
this.captureService.getImage(this.screen.nativeElement, true)
.pipe(
  tap(img => {
    console.log(img);
  })
).subscribe();
```

### For the entire BODY
```
this.captureService.getImage(document.body, true)
.pipe(
  tap(img => {
    console.log(img);
  })
).subscribe();
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
