/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RemoveOrgPopUpService } from './remove-org-pop-up.service';

describe('Service: RemoveOrgPopUp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoveOrgPopUpService]
    });
  });

  it('should ...', inject([RemoveOrgPopUpService], (service: RemoveOrgPopUpService) => {
    expect(service).toBeTruthy();
  }));
});
