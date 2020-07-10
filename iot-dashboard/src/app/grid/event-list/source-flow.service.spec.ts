import { TestBed } from '@angular/core/testing';

import { SourceFlowService } from './source-flow.service';

describe('SourceFlowService', () => {
  let service: SourceFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourceFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
