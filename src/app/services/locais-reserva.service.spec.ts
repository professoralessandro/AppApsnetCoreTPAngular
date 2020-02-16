import { TestBed } from '@angular/core/testing';

import { LocaisReservaService } from './locais-reserva.service';

describe('LocaisReservaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocaisReservaService = TestBed.get(LocaisReservaService);
    expect(service).toBeTruthy();
  });
});
