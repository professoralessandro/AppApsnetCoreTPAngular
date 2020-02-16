import { TestBed } from '@angular/core/testing';

import { QuiosqueUnidadeService } from './quiosque-unidade.service';

describe('QuiosqueUnidadeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuiosqueUnidadeService = TestBed.get(QuiosqueUnidadeService);
    expect(service).toBeTruthy();
  });
});
