import { TestBed } from '@angular/core/testing';

import { AulaService } from './area.service';

describe('AulaService', () => {
  let service: AulaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AulaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
