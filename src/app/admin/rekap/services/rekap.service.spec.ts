import { TestBed } from '@angular/core/testing';

import { RekapService } from './rekap.service';

describe('RekapService', () => {
  let service: RekapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RekapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
