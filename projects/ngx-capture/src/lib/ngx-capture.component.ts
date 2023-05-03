import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CropDimensions, NgxCaptureService } from './ngx-capture.service';

type Point = {
  x: number;
  y: number;
};

@Component({
  selector: 'ngx-capture',
  template: `
    <ng-content></ng-content>
    <div class="overlay" #over>
      <div class="rectangle" #rect></div>
    </div>
  `,
  styleUrls: ['./ngx-capture.component.scss'],
})
export class NgxCaptureComponent implements OnInit {
  @ViewChild('rect', { static: true }) rectangle: ElementRef;
  @ViewChild('over', { static: true }) overlay: ElementRef;

  @Input() target: any;
  @Output() resultImage = new EventEmitter<string>();

  rect: HTMLElement;
  captureZone: HTMLElement;

  isDrawing = false;

  mouseStart: Point = { x: 0, y: 0 };

  cropDimensions: CropDimensions = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  };

  destroy$ = new Subject<void>();

  constructor(private captureService: NgxCaptureService) {}

  ngOnInit() {
    setTimeout(() => {
      this.rect = this.rectangle.nativeElement;
      this.captureZone = this.overlay.nativeElement;

      if (!this.captureZone) {
        console.warn('"captureZone" is not set');
        return;
      }

      this.captureZone.onmousedown = (e) => this.startCapture(e);
      this.captureZone.onmousemove = (e) => this.drawRect(e);
      this.captureZone.onmouseup = () => this.endCapture();
    }, 2000);
  }

  private startCapture(e: any) {
    const mouse = this.setMousePosition(e, true);

    this.isDrawing = true;

    this.cropDimensions = {
      x: mouse.x,
      y: mouse.y,
      width: 0,
      height: 0,
    };

    this.captureZone.style.cursor = 'crosshair';
  }

  private drawRect(e: any) {
    if (this.isDrawing) {
      const mouse = this.setMousePosition(e, false);

      this.cropDimensions = {
        x: mouse.x - this.mouseStart.x < 0 ? mouse.x : this.mouseStart.x,
        y: mouse.y - this.mouseStart.y < 0 ? mouse.y : this.mouseStart.y,
        width: Math.abs(mouse.x - this.mouseStart.x),
        height: Math.abs(mouse.y - this.mouseStart.y),
      };
      this.setRectangle();
    }
  }

  private setMousePosition(e: any, isStart = false): Point {
    const ev = e || window.event; // Moz || IE
    const mouse: Point = { x: 0, y: 0 };

    if (ev.pageX) {
      // Moz
      mouse.x = ev.clientX;
      mouse.y = ev.clientY;
    } else if (ev.clientX) {
      // IE
      mouse.x = ev.clientX + document.body.scrollLeft;
      mouse.y = ev.clientY + document.body.scrollTop;
    }

    if (isStart) {
      this.mouseStart.x = mouse.x;
      this.mouseStart.y = mouse.y;
    }

    return mouse;
  }

  private endCapture() {
    this.captureZone.style.cursor = 'default';
    this.isDrawing = false;

    this.captureService
      .getImage(this.target, false, {
        ...this.cropDimensions,
        x: this.cropDimensions.x + window.scrollX,
        y: this.cropDimensions.y + window.scrollY,
      })
      .pipe(
        take(1),
        tap((img) => {
          this.resultImage.emit(img);
        })
      )
      .subscribe();

    this.cropDimensions = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
    this.setRectangle();
  }

  private setRectangle() {
    this.rect.style.left = this.cropDimensions.x + 'px';
    this.rect.style.top = this.cropDimensions.y + 'px';
    this.rect.style.width = this.cropDimensions.width + 'px';
    this.rect.style.height = this.cropDimensions.height + 'px';
  }
}
