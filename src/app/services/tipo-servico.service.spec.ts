import { TestBed } from '@angular/core/testing';

import { TipoServicoService } from './tipo-servico.service';

describe('TipoServicoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoServicoService = TestBed.get(TipoServicoService);
    expect(service).toBeTruthy();
  });
});
