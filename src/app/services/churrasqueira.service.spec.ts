import { TestBed } from '@angular/core/testing';

import { ChurrasqueiraService } from './churrasqueira.service';

describe('ChurrasqueiraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChurrasqueiraService = TestBed.get(ChurrasqueiraService);
    expect(service).toBeTruthy();
  });
});
