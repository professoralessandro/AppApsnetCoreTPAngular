import { TestBed } from '@angular/core/testing';

import { TipoItensService } from './tipo-itens.service';

describe('TipoItensService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoItensService = TestBed.get(TipoItensService);
    expect(service).toBeTruthy();
  });
});
