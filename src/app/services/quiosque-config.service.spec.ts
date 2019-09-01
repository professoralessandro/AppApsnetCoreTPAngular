import { TestBed } from '@angular/core/testing';

import { QuiosqueConfigService } from './quiosque-config.service';

describe('QuiosqueConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuiosqueConfigService = TestBed.get(QuiosqueConfigService);
    expect(service).toBeTruthy();
  });
});
