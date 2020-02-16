import { TestBed } from '@angular/core/testing';
import { Frequentadores } from '@app/models/Frequentadores';

describe('FrequentadorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Frequentadores = TestBed.get(Frequentadores);
    expect(service).toBeTruthy();
  });
});
