import { TestBed } from '@angular/core/testing';

import { FormasPagamentoService } from './formas-pagamento.service';

describe('FormasPagamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormasPagamentoService = TestBed.get(FormasPagamentoService);
    expect(service).toBeTruthy();
  });
});
