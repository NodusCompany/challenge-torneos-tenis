import { TestBed } from '@angular/core/testing';

import { GrandSlamService } from './grand-slam.service';

describe('GrandSlamService', () => {
  let service: GrandSlamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrandSlamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
