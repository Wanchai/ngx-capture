import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { NgxCaptureService } from './ngx-capture.service';

@Component({
  selector: 'ngx-capture',
  template: `
  <ng-content></ng-content>
  <div class="overlay" #over>
    <div class="rectangle" #rect></div>
  </div>
  `,
  styleUrls: ['./ngx-capture.component.scss']
})
export class NgxCaptureComponent implements OnInit {

  @ViewChild('rect', { static: true }) rectangle: ElementRef;
  @ViewChild('over', { static: true }) overlay: ElementRef;

  @Input() target: any;

  @Output() resultImage = new EventEmitter<string>();

  rect: HTMLElement;
  captureZone: HTMLElement;

  isDrawing = false;

  cropDimensions = {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  };

  mouse = {
    x: 0,
    y: 0,
    startX: 0,
    startY: 0
  };

  destroy$ = new Subject<void>();

  constructor(private captureService: NgxCaptureService) { }

  ngOnInit() {
    // if (!this.captureZone) {
    //   console.warn('"captureZone" is not set');
    //   return;
    // }

    setTimeout(() => {
      this.rect = this.rectangle.nativeElement;
      this.captureZone = this.overlay.nativeElement;

      this.captureZone.onmousedown = (e) => this.startCapture(e);
      this.captureZone.onmousemove = (e) => this.drawRect(e);
      this.captureZone.onmouseup = () => this.endCapture();
    }, 2000);

  }

  private setRectangle() {
    this.rect.style.left = this.cropDimensions.x + 'px';
    this.rect.style.top = this.cropDimensions.y + 'px';
    this.rect.style.width = this.cropDimensions.width + 'px';
    this.rect.style.height = this.cropDimensions.height + 'px';
  }

  private startCapture(e: any) {
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
    this.captureZone.style.cursor = 'crosshair';
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

  private endCapture() {
    this.captureZone.style.cursor = 'default';
    this.isDrawing = false;

    this.captureService
      .getImage(this.target, false, this.cropDimensions)
      .pipe(
        take(1),
        tap(img => {
          this.resultImage.emit(img);
        })
      ).subscribe();

    this.cropDimensions = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    this.setRectangle();
  }

}
