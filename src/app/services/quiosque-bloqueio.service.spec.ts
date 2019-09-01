import { TestBed } from '@angular/core/testing';

import { QuiosqueBloqueioService } from './quiosque-bloqueio.service';

describe('QuiosqueBloqueioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuiosqueBloqueioService = TestBed.get(QuiosqueBloqueioService);
    expect(service).toBeTruthy();
  });
});
