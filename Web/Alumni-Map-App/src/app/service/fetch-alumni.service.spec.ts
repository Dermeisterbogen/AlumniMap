import { TestBed } from '@angular/core/testing';

import { FetchAlumniService } from './fetch-alumni.service';

describe('FetchAlumniService', () => {
  let service: FetchAlumniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchAlumniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
