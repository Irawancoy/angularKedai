import { TestBed } from '@angular/core/testing';

import { ProsedurService } from './prosedur.service';

describe('ProsedurService', () => {
  let service: ProsedurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProsedurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
