import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCaptureComponent } from './ngx-capture.component';

describe('NgxCaptureComponent', () => {
  let component: NgxCaptureComponent;
  let fixture: ComponentFixture<NgxCaptureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxCaptureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
