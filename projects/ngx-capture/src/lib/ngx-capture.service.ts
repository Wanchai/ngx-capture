import {Injectable} from '@angular/core';
import html2canvas from 'html2canvas';
import {from, Observable, of} from 'rxjs';

export interface CropDimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

@Injectable({
  providedIn: 'root',
})
export class NgxCaptureService {
  getImage(screen: HTMLElement, fullCapture?: boolean, cropDimensions?: CropDimensions): Observable<string> {
    let options = {
      logging: false,
      useCORS: true,
      scale: 1
    };

    if (!fullCapture && cropDimensions.width > 10 && cropDimensions.height > 10) {
      options = {...options, ...cropDimensions};
    } else if (!fullCapture) {
      return of(null);
    }

    return from(
      html2canvas(screen, options)
        .then(
          (canv) => {
            return canv.toDataURL('image/png');
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

  downloadImage(img: string) {
    const element = document.createElement('a');
    element.setAttribute('href', img);
    element.setAttribute('download', 'capture');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
}
