import { TestBed } from '@angular/core/testing';

import { ReservasiService } from './reservasi.service';

describe('ReservasiService', () => {
  let service: ReservasiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservasiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
