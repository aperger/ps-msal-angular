import { TestBed } from '@angular/core/testing';

import { AppUrlService } from './app-url.service';

describe('AppUrlService', () => {
  let service: AppUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
