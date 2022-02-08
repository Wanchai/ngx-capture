import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import { from, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NgxCaptureService {
  getImage(screen: HTMLElement, fullCapture?: boolean, cropDimensions?: any): Observable<string> {
    let options = {
      logging: false,
    };

    if (!fullCapture && cropDimensions.width > 10 && cropDimensions.height > 10) {
      options = { ...options, ...cropDimensions };
    } else if (!fullCapture) {
      return of(null);
    }

    return from(
      html2canvas(screen, options)
        .then(
          (canv) => {
            const img = canv.toDataURL('image/png');
            return img;
          },
          (err) => {
            throw new Error(err);
          }
        )
        .catch((res) => {
          throw new Error(res);
        })
    );
  }

  // TODO
  private downloadImage(img: string) {
    // this.canvas.nativeElement.src = img;
    // this.downloadLink.nativeElement.href = img;
    // this.downloadLink.nativeElement.download = 'test.png';
    // this.downloadLink.nativeElement.click();
  }
}
