import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { City } from '../interfaces/city.interface';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class WeatherService {

  private _citiesUrl: string;
  private _currentConditionsUrl: string;

  constructor(private _http: HttpClient) {
    this._citiesUrl = environment.locationsUrl;
    this._currentConditionsUrl = environment.weatherUrl;
  }

  private _handleError(error: any): Observable<any> {
    const errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    // this.toasterService.showToaster('error', 'Oops!! An error occurred', errMsg);
    // this.loaderService.displayLoader(false);
    return throwError(errMsg);
  }

  private _getApiUrl(query: string = '', baseUrl: string): string {
    let urlWithApiKey = `${baseUrl}?appid=${environment.weatherApiKey}`;

    if (baseUrl === this._citiesUrl) {
      urlWithApiKey = `${baseUrl}?apikey=${environment.locationsApiKey}`;
    }

    return urlWithApiKey + '&q=' + query || '';
  }

  private _getResponse(query: string = '', baseUrl: string = this._currentConditionsUrl): Observable<any> {
    return this._http
      .get(this._getApiUrl(query, baseUrl))
      .pipe(
        catchError(this._handleError)
      );
  }

  public getCity(stringSearch: string): Observable<City[]> {
    return this._getResponse(stringSearch, this._citiesUrl);
  }

  public getCurrentConditions(city: City): Observable<any> {
    const query = city.EnglishName + ',' + city.Country.ID.toLowerCase() + '&units=metric';
    return this._getResponse(query);
  }
}
