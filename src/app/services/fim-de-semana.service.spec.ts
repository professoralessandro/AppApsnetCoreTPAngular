import { TestBed } from '@angular/core/testing';

import { FimDeSemanaService } from './fim-de-semana.service';

describe('FimDeSemanaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FimDeSemanaService = TestBed.get(FimDeSemanaService);
    expect(service).toBeTruthy();
  });
});
