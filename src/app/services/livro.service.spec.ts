import { TestBed } from '@angular/core/testing';

import { AndarService } from './andar.service';

describe('AndarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AndarService = TestBed.get(AndarService);
    expect(service).toBeTruthy();
  });
});
