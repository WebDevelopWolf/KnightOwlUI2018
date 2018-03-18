import { TestBed, inject } from '@angular/core/testing';

import { KoapiService } from './koapi.service';

describe('KoapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KoapiService]
    });
  });

  it('should be created', inject([KoapiService], (service: KoapiService) => {
    expect(service).toBeTruthy();
  }));
});
