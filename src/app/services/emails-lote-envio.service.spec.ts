import { TestBed } from '@angular/core/testing';

import { EmailsLoteEnvioService } from './emails-lote-envio.service';

describe('EmailsLoteEnvioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailsLoteEnvioService = TestBed.get(EmailsLoteEnvioService);
    expect(service).toBeTruthy();
  });
});
