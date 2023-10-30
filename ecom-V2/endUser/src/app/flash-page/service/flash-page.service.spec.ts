import { TestBed } from '@angular/core/testing';

import { FlashPageService } from './flash-page.service';

describe('FlashPageService', () => {
  let service: FlashPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlashPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
