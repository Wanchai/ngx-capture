import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { NgxCaptureService } from 'projects/ngx-capture/src/public-api';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'ngx-capture demo';
  version = VERSION.full;
  img = '';

  @ViewChild('screen', { static: true }) screen: any;

  constructor(private readonly captureService: NgxCaptureService) {}
  ngOnInit(): void {}

  saveImage(img: string) {
    this.img = img;
  }

  fullCap() {
    this.captureService
      .getImage(this.screen.nativeElement, true)
      .pipe(tap((img) => (this.img = img)))
      .subscribe();
  }

  fullCapWithDownload(zone: any) {
    this.captureService
      .getImage(zone, true)
      .pipe(
        tap((img) => this.captureService.downloadImage(img)),
        tap((img) => (this.img = img))
      )
      .subscribe();
  }
}
