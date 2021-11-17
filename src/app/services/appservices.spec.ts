import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppServices } from './appservices';

describe('AppServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppServices
      ],
      imports: [
        HttpClientModule,
        HttpModule
      ]
    });
  });

  it('should be created', inject([AppServices], (service: AppServices) => {
    expect(service).toBeTruthy();
  }));
});
