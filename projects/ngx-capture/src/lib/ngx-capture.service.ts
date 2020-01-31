import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';

// declare var html2canvas: any;
// import * as html2canvas_ from 'html2canvas';
// const html2canvas = html2canvas_;

@Injectable({
  providedIn: 'root'
})
export class NgxCaptureService {

  constructor() { }

  getImage(screen: HTMLElement, fullCapture?: boolean, cropDimensions?: any): Promise<string> {
    let options = {
      logging: false
    };
    if (!fullCapture && cropDimensions.width > 10 && cropDimensions.height > 10) {
      options = { ...options, ...cropDimensions };
    } else if (!fullCapture) {
      return;
    }

    return html2canvas(screen, options).then(canv => {
      const img = canv.toDataURL('image/png');

      return Promise.resolve(img);
    }, err => {
      throw new Error(err);
    }).catch(res => {
      throw new Error(res);
    });
  }

  // TODO
  private downloadImage(img: string) {
    // this.canvas.nativeElement.src = img;
    // this.downloadLink.nativeElement.href = img;
    // this.downloadLink.nativeElement.download = 'test.png';
    // this.downloadLink.nativeElement.click();
  }
}
