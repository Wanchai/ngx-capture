import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxCaptureModule } from '../../../ngx-capture/src/lib/ngx-capture.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxCaptureModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
