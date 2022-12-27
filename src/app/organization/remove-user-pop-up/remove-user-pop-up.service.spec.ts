import { TestBed } from '@angular/core/testing';

import { RemoveUserPopUpService } from './remove-user-pop-up.service';

describe('RemoveUserPopUpService', () => {
  let service: RemoveUserPopUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemoveUserPopUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
