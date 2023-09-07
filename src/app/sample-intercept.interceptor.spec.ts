import { TestBed } from '@angular/core/testing';

import { SampleInterceptInterceptor } from './sample-intercept.interceptor';

describe('SampleInterceptInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SampleInterceptInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SampleInterceptInterceptor = TestBed.inject(SampleInterceptInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
