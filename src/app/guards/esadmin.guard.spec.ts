import { TestBed } from '@angular/core/testing';

import { EsadminGuard } from './esadmin.guard';

describe('EsadminGuard', () => {
  let guard: EsadminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EsadminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
