import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxCaptureComponent } from './ngx-capture.component';

@NgModule({
  declarations: [NgxCaptureComponent],
  imports: [
  ],
  exports: [NgxCaptureComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NgxCaptureModule { }
