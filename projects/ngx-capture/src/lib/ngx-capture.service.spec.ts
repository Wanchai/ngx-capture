import { TestBed } from '@angular/core/testing';

import { NgxCaptureService } from './ngx-capture.service';

describe('NgxCaptureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxCaptureService = TestBed.get(NgxCaptureService);
    expect(service).toBeTruthy();
  });
});
