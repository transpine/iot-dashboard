import { TestBed } from '@angular/core/testing';

import { SourceMockService } from './source-mock.service';

describe('SourceMockService', () => {
  let service: SourceMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourceMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
