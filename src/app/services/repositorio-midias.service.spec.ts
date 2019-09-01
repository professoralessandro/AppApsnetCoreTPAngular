import { TestBed } from '@angular/core/testing';

import { RepositorioMidiasService } from './repositorio-midias.service';

describe('RepositorioMidiasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RepositorioMidiasService = TestBed.get(RepositorioMidiasService);
    expect(service).toBeTruthy();
  });
});
