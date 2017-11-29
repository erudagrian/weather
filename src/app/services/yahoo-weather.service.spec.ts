import { TestBed, inject } from '@angular/core/testing';

import { YahooWeatherService } from './yahoo-weather.service';

describe('YahooWeatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YahooWeatherService]
    });
  });

  it('should be created', inject([YahooWeatherService], (service: YahooWeatherService) => {
    expect(service).toBeTruthy();
  }));
});
