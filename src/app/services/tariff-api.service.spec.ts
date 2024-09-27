import { TestBed } from '@angular/core/testing';

import { TariffApiService } from './tariff-api.service';

describe('TariffApiService', () => {
  let service: TariffApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TariffApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
