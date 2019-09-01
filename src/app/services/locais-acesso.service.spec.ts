import { TestBed } from '@angular/core/testing';

import { LocaisAcessoService } from './locais-acesso.service';

describe('LocaisAcessoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocaisAcessoService = TestBed.get(LocaisAcessoService);
    expect(service).toBeTruthy();
  });
});
