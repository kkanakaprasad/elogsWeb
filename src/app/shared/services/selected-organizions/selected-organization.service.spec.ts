import { TestBed } from '@angular/core/testing';

import { SelectedOrganizationService } from './selected-organization.service';

describe('SelectedOrganizationService', () => {
  let service: SelectedOrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedOrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
