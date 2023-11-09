import { TestBed } from '@angular/core/testing';

import { KategoriService } from './kategori.service';

describe('KategoriService', () => {
  let service: KategoriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KategoriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
