import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
// declare var html2canvas: any;
// import * as html2canvas_ from 'html2canvas';

// const html2canvas = html2canvas_;

@Injectable({
  providedIn: 'root'
})
export class NgxCaptureService {

  mouse = {
    x: 0,
    y: 0,
    startX: 0,
    startY: 0
  };
  cropDimensions = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };

  // captureZone: any;
  // rectangle: any;
  isDrawing = false;

  // @ViewChild('canvas', { static: true }) canvas: ElementRef;
  // @ViewChild('downloadLink', { static: true }) downloadLink: ElementRef;
  // @ViewChild('download', { static: true }) download: ElementRef;
  // @ViewChild('rectangle', { static: true }) rect: ElementRef;
  // @ViewChild('overlay', { static: true }) overlay: ElementRef;

  constructor() { }

  // ngOnInit() {
  /*
  this.captureZone = this.overlay.nativeElement;
  this.rectangle = this.rect.nativeElement;

  this.captureZone.onmousedown = (e) => this.startCapture(e);
  this.captureZone.onmousemove = (e) => this.drawRect(e);
  this.captureZone.onmouseup = () => this.endCapture();
  */
  // }

  private downloadImage() {
    // this.saveImage(true);
  }

  getImage(screen: HTMLElement, fullCapture?: boolean): Promise<string> {
    // console.log(source.style.width);
    let options = {
      logging: false
    };
    if (!fullCapture && this.cropDimensions.width > 10 && this.cropDimensions.height > 10) {
      options = { ...options, ...this.cropDimensions };
    } else if (!fullCapture) {
      return;
    }

    return html2canvas(screen, options).then(canv => {
      const img = canv.toDataURL('image/png');

      // this.resultImage.emit(img);
      return Promise.resolve(img);

      // this
      //   .http
      //   .post(RoutesService.API_URL + '/monitor/errorlog', error, RoutesService.getJsonHeaders())
      //   .toPromise()
      //   .finally(() => {
      //     this.firstLoad = false;
      //     setTimeout(() => {
      //       this.open = false;
      //     }, 10000);
      //   });

      // this.canvas.nativeElement.src = img;
      // this.downloadLink.nativeElement.href = img;
      // this.downloadLink.nativeElement.download = 'test.png';
      // // this.downloadLink.nativeElement.click();
      // console.log(this.download.nativeElement);
    }, err => {
      throw new Error(err);
    }).catch(res => {
      throw new Error(res);
    });
  }

  private saveCapture() {
    // this.saveImage();
    // this.overlay.nativeElement.style.display = 'none';
  }

  // DRAW RECT TO CAPTURE CONTENT
  private startCapture(e: any) {
    console.log('begun.');
    this.setMousePosition(e);

    this.isDrawing = true;

    this.mouse.startX = this.mouse.x;
    this.mouse.startY = this.mouse.y;
    this.cropDimensions = {
      x: this.mouse.x,
      y: this.mouse.y,
      width: 0,
      height: 0,
    };

    this.setRectangle();
    // this.captureZone.style.cursor = 'crosshair';
  }

  private drawRect(e: any) {
    if (this.isDrawing) {
      this.setMousePosition(e);
      this.cropDimensions = {
        x: (this.mouse.x - this.mouse.startX < 0) ? this.mouse.x : this.mouse.startX,
        y: (this.mouse.y - this.mouse.startY < 0) ? this.mouse.y : this.mouse.startY,
        width: Math.abs(this.mouse.x - this.mouse.startX),
        height: Math.abs(this.mouse.y - this.mouse.startY),
      };
      this.setRectangle();
    }
  }

  private endCapture() {
    console.log('finsihed.');
    // this.captureZone.style.cursor = 'default';
    this.isDrawing = false;

    this.saveCapture();
    this.cropDimensions = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    this.setRectangle();
  }

  private setMousePosition(e: any) {
    // tslint:disable-next-line: deprecation
    const ev = e || window.event; // Moz || IE
    if (ev.pageX) { // Moz
      this.mouse.x = ev.pageX + window.pageXOffset;
      this.mouse.y = ev.pageY + window.pageYOffset;
    } else if (ev.clientX) { // IE
      this.mouse.x = ev.clientX + document.body.scrollLeft;
      this.mouse.y = ev.clientY + document.body.scrollTop;
    }
  }

  private setRectangle() {
    // this.rectangle.style.left = this.cropDimensions.x + 'px';
    // this.rectangle.style.top = this.cropDimensions.y + 'px';
    // this.rectangle.style.width = this.cropDimensions.width + 'px';
    // this.rectangle.style.height = this.cropDimensions.height + 'px';
  }
}
