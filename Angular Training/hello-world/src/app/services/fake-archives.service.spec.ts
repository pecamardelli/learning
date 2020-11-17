import { TestBed } from '@angular/core/testing';

import { FakeArchivesService } from './fake-archives.service';

describe('FakeArchivesService', () => {
  let service: FakeArchivesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FakeArchivesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
