import { TestBed } from '@angular/core/testing';

import { SearchTriggerService } from './search-trigger.service';

describe('SearchTriggerService', () => {
  let service: SearchTriggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchTriggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
