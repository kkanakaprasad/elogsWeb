import { TestBed } from '@angular/core/testing';

import { CustomModelService } from './custom-model.service';

describe('CustomModelService', () => {
  let service: CustomModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
