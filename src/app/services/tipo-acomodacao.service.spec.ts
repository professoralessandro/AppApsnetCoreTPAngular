import { TestBed } from '@angular/core/testing';

import { TipoAcomodacaoService } from './tipo-acomodacao.service';

describe('TipoAcomodacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoAcomodacaoService = TestBed.get(TipoAcomodacaoService);
    expect(service).toBeTruthy();
  });
});
