import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { City } from '../../../interfaces/city.interface';
import { WeatherService } from '../../../services/weather.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss', './card.weather.scss']
})
export class CardComponent implements OnInit, OnDestroy {

  @Input() public location: City;
  @Input() public clock$: Observable<Date>;

  public sufix: string;
  public weatherSubscription$: Observable<any>;
  private _currentWeather$: Observable<any> = null;

  // Weather switches
  semi = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g'];

  constructor(private _ws: WeatherService) {}

  ngOnInit() {
    this.sufix = 'weather';
    this.weatherSubscription$ = this._getCityWeather(this.location);
  }

  ngOnDestroy() {
    this._currentWeather$ = null;
  }

  private _getCityWeather(city) {
    // if (!this._currentWeather) {
      this._currentWeather$ = this._ws
        .getCurrentConditions(city)
        .pipe(
          map(cityWeather => {
            const hourOffset = cityWeather.timezone / 3600;
            switch (true) {
              case cityWeather.clouds.all >= 80:
                cityWeather.cloudArray = this.semi.slice(0, 4);
                break;
              case cityWeather.clouds.all >= 60 && cityWeather.clouds.all < 80:
                cityWeather.cloudArray = this.semi.slice(0, 3);
                break;
              case cityWeather.clouds.all >= 40 && cityWeather.clouds.all < 60:
                cityWeather.cloudArray = this.semi.slice(0, 2);
                break;
              case cityWeather.clouds.all >= 20 && cityWeather.clouds.all < 40:
                cityWeather.cloudArray = this.semi.slice(0, 1);
                break;
              default:
                cityWeather.cloudArray = [];
                break;
            }

            switch (true) {
              case cityWeather.weather[0].id >= 500 && cityWeather.weather[0].id < 600:
                cityWeather.weatherCondition = 'rainy';
                cityWeather.sky = 'grey';
                break;
              case cityWeather.weather[0].id >= 600 && cityWeather.weather[0].id < 700:
                cityWeather.weatherCondition = 'snowy';
                cityWeather.sky = 'grey';
                break;
              case cityWeather.weather[0].id >= 300 && cityWeather.weather[0].id < 400:
                cityWeather.weatherCondition = 'drizzly';
                cityWeather.sky = 'grey';
                break;
              case cityWeather.weather[0].id >= 200 && cityWeather.weather[0].id < 300:
                cityWeather.weatherCondition = 'stormy';
                cityWeather.sky = 'grey';
                break;
              case cityWeather.weather[0].id >= 801 && cityWeather.weather[0].id < 805:
                cityWeather.weatherCondition = 'cloudy';
                cityWeather.sky = 'grey';
                break;
              default:
                cityWeather.sky = 'blue';
                break;
            }

            cityWeather.temp = Math.round(cityWeather.main.temp) + ' ºC';
            cityWeather.hoursOffset = `UTC ${(hourOffset >= 0) ? '+' : ''}${hourOffset}`;
            cityWeather.windy = cityWeather.wind?.speed > 30;
            cityWeather.description = cityWeather.weather[0].description;
            cityWeather.rainy = cityWeather.rain ? true : false;
            return cityWeather;
          })
        );
    // }

    return this._currentWeather$;
  }
}
