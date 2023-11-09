import { TestBed } from '@angular/core/testing';

import { LayananService } from './layanan.service';

describe('LayananService', () => {
  let service: LayananService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayananService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
