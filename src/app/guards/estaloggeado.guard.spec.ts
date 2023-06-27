import { TestBed } from '@angular/core/testing';

import { EstaloggeadoGuard } from './estaloggeado.guard';

describe('EstaloggeadoGuard', () => {
  let guard: EstaloggeadoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EstaloggeadoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
