import { TestBed, inject } from '@angular/core/testing';

import { HeroViewService } from './hero-view.service';

describe('HeroViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroViewService]
    });
  });

  it('should be created', inject([HeroViewService], (service: HeroViewService) => {
    expect(service).toBeTruthy();
  }));
});
