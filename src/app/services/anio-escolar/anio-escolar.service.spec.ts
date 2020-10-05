import { TestBed } from '@angular/core/testing';

import { AnioEscolarService } from './anio-escolar.service';

describe('AnioEscolarService', () => {
  let service: AnioEscolarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnioEscolarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
