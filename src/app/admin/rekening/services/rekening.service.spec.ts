import { TestBed } from '@angular/core/testing';

import { RekeningService } from './rekening.service';

describe('RekenningService', () => {
  let service: RekeningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RekeningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
