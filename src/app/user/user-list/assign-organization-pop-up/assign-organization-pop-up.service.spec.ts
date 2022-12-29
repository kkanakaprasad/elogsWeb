/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AssignOrganizationPopUpService } from './assign-organization-pop-up.service';

describe('Service: AssignOrganizationPopUp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssignOrganizationPopUpService]
    });
  });

  it('should ...', inject([AssignOrganizationPopUpService], (service: AssignOrganizationPopUpService) => {
    expect(service).toBeTruthy();
  }));
});
