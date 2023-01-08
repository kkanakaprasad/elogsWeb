import { TestBed } from '@angular/core/testing';

import { AddUserPopUpService } from './add-user-pop-up.service';

describe('AddUserPopUpService', () => {
  let service: AddUserPopUpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddUserPopUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
