import { TestBed } from '@angular/core/testing';

import { UserDetailsService } from './user-details.service';

describe('UserService', () => {
  let service: UserDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
