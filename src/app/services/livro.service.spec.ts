import { TestBed } from '@angular/core/testing';

import { LivroService } from './livro.service';

describe('AndarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LivroService = TestBed.get(LivroService);
    expect(service).toBeTruthy();
  });
});
