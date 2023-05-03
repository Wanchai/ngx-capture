# NGX-CAPTURE

[![npm version](https://badge.fury.io/js/ngx-capture.svg)](https://badge.fury.io/js/ngx-capture)

Screen capture library for Angular.
Define a zone and it will capture it and return a string containing a base64 PNG.

Or download the result file.

[Stackblitz Example](https://stackblitz.com/edit/ngx-capture-example-12)

Angular 8 > `npm install ngx-capture@0.0.3-alpha`

Angular 9 > `npm install ngx-capture@0.0.4-beta`

Angular 10+ > `npm install ngx-capture`

💪 If you like this library, [you can buy me a coffee here!](https://ko-fi.com/wanchai_coding)

## Example

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

Define the screen capture area with a variable (eg. #screen):

```html
<div #screen>
  <h1>Hey!</h1>
  <p>some content</p>
</div>
```

## The is 4 ways to use this library

### For a full element capture, use the service:

Each time you call the service, it will capture the whole content of the HTML element marked **#screen**

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

This will capture the full page

```ts
this.captureService
  .getImage(document.body, true)
  .pipe(
    tap((img) => {
      console.log(img);
    })
  )
  .subscribe();
```

### To access crop options, use the component

This will allow you to click and drag to select the area you want to capture.

ex: https://ngx-capture-example-component.stackblitz.io

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

### Using crop options freely

This way, you can set a specific area to capture.

```ts
this.captureService
  .getImage(this.screen.nativeElement, false, {
    x: 50,
    y: 150,
    width: 50,
    height: 50,
  })
  .pipe(tap((img) => (this.img = img)))
  .subscribe();
```

## Download the result directly

Once you have the image as a string, you can pass it to the `downloadImage` method to download it.

```ts
this.captureService
  .getImage(document.body, true)
  .pipe(
    tap((img) => {
      console.log(img);
    }),
    tap((img) => this.captureService.downloadImage(img))
  )
  .subscribe();
```
