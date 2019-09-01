import { TestBed } from '@angular/core/testing';

import { CategoriaLocaisReservaService } from './categoria-locais-reserva.service';

describe('CategoriaLocaisReservaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriaLocaisReservaService = TestBed.get(CategoriaLocaisReservaService);
    expect(service).toBeTruthy();
  });
});
