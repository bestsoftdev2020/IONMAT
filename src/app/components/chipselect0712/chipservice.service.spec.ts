import { TestBed } from '@angular/core/testing';

import { ChipserviceService } from './chipservice.service';

describe('ChipserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChipserviceService = TestBed.get(ChipserviceService);
    expect(service).toBeTruthy();
  });
});
