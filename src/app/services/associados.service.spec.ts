import { TestBed } from '@angular/core/testing';

import { AssociadoService } from './associados.service';

describe('AssociadosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssociadoService = TestBed.get(AssociadoService);
    expect(service).toBeTruthy();
  });
});
