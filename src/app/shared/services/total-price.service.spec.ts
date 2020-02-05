import { TestBed } from '@angular/core/testing';

import { TotalPriceService } from './total-price.service';

describe('TotalPriceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TotalPriceService = TestBed.get(TotalPriceService);
    expect(service).toBeTruthy();
  });
});
