import { TestBed } from '@angular/core/testing';

import { PembatalanService } from './pembatalan.service';

describe('PembatalanService', () => {
  let service: PembatalanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PembatalanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
