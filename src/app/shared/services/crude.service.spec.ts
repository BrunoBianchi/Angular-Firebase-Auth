import { TestBed } from '@angular/core/testing';

import { CrudeService } from './crude.service';

describe('CrudeService', () => {
  let service: CrudeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
