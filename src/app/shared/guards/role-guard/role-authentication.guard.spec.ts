import { TestBed } from '@angular/core/testing';

import { RoleAuthenticationGuard } from './role-authentication.guard';

describe('RoleAuthenticationGuard', () => {
  let guard: RoleAuthenticationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleAuthenticationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
