import { Component, OnInit, VERSION, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'ngx-capture demo';
  version = VERSION.full;
  img = '';

  @ViewChild('screen', { static: true }) screen: any;

  ngOnInit(): void { }

  saveImage(img: string) {
    this.img = img;
  }
}
