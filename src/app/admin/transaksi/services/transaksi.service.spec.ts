import { TestBed } from '@angular/core/testing';

import { TransaksiService } from './transaksi.service';

describe('TransaksiService', () => {
  let service: TransaksiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransaksiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
