/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SocketApiService } from './socket-api.service';

describe('SocketApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketApiService],
    });
  });

  it('should ...', inject([SocketApiService], (service: SocketApiService) => {
    expect(service).toBeTruthy();
  }));
});
