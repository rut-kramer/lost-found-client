import { TestBed, inject } from '@angular/core/testing';

import { SearchesService } from './searches.service';

describe('SearchesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchesService]
    });
  });

  it('should be created', inject([SearchesService], (service: SearchesService) => {
    expect(service).toBeTruthy();
  }));
});
