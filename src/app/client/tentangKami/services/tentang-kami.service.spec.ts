import { TestBed } from '@angular/core/testing';

import { TentangKamiService } from './tentang-kami.service';

describe('TentangKamiService', () => {
  let service: TentangKamiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TentangKamiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
