
import {throwError as observableThrowError } from 'rxjs/index';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from '../models/city.model';

//   woidSearch = 'select * from geo.places where text="sidney AU"';
//   citySearch = 'select woeid, name, country.code, timezone.content from geo.places where text="paris" and placetype = "7"';
//   currentConditionsSearch = 'select item from weather.forecast where woeid in (select woeid from geo.places where text="paris")';

@Injectable()
export class YahooWeatherService {

  private _headers: HttpHeaders;

  constructor(private _http: HttpClient) {
    this._headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'CORS': 'Access-Control-Allow-Origin',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
  }

  private _handleError(error: any): Observable<any> {
    const errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    // this.toasterService.showToaster('error', 'Oops!! An error occurred', errMsg);
    // this.loaderService.displayLoader(false);
    return observableThrowError(errMsg);
  }

  private _getApiUrl(query: string): string {
    return 'https://query.yahooapis.com/v1/public/yql?q=' + query + '&format=json';
  }

  private _extractData(res: Response): object {
    return res.json() || {};
  }

  private _getResponse(query: string): Observable<any> {
    return this._http
      .get(this._getApiUrl(query)).pipe(
      map(this._extractData));
  }

  private _parseCity(yahooCity: any): City {
    return new City ({
      name: yahooCity.name,
      woeid: yahooCity.woeid,
      country_code: yahooCity.country.code,
      continent: yahooCity.timezone.split('/')[0].toLowerCase(),
      description: yahooCity.name + ' ' + yahooCity.country.code
    });
  }

  public getLocation(woeid: string): Observable<any> {
    const searchtext = 'select * from weather.forecast where woeid in (' + woeid + ') and u = "c"';
    return this._getResponse(searchtext);
  }


  public getCity(stringSearch: string): Observable<City[]> {
    const searchtext =
      'select woeid, name, country.code, timezone.content from geo.places where text="' + stringSearch + '" and placetype = "7"';
    return this._getResponse(searchtext).pipe(
      map(city => {
        if (city.query.results) {
          const { place } = city.query.results;
          if (place.length) {
            return place.map((jsonResponse) => this._parseCity(jsonResponse));
          } else {
            return [this._parseCity(place)];
          }
        } else {
          return [];
        }
      }));
  }

  public getCurrentConditions(woeid: string): Observable<any> {
    const searchtext = 'select item.condition from weather.forecast where woeid in (' + woeid + ') and u = "c"';
    return this._getResponse(searchtext);
  }

  public getWoeid(city: string): Observable<any> {
    const woeidQuery = 'select woeid from geo.places(1) where text ="' + city + '"';
    return this._getResponse(woeidQuery);
      // .map(response => <any>response.json().muscleCarData);
  }
}
