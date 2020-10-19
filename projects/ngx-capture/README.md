# NGX-CAPTURE

Screen capture library for Angular.
Define a zone and it will capture it and return a string containing a base64 PNG.

[Stackblitz Example](https://stackblitz.com/edit/ngx-capture-example)

Angular 8 > `npm install ngx-capture@0.0.3-alpha`

Angular 9 > `npm install ngx-capture@0.0.4-beta`

Angular 10 > `npm install ngx-capture`

💪 If you like this library, please [send a message here](https://twiiter.com/tmalicet) to tell me!

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
