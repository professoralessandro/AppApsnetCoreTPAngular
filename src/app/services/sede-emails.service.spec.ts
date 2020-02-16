import { TestBed } from '@angular/core/testing';

import { SedeEmailsService } from './sede-emails.service';

describe('SedeEmailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SedeEmailsService = TestBed.get(SedeEmailsService);
    expect(service).toBeTruthy();
  });
});
