import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class YahooWeatherService {
  city = 'Bangalore';
  woidSearch = 'select * from geo.places where text="sidney AU"';
  citySearch = 'select woeid, name, country.code, timezone.content from geo.places where text="paris" and placetype = "7"';
  currentConditionsSearch = 'select item from weather.forecast where woeid in (select woeid from geo.places where text="paris")';
  headers: Headers;
  options: RequestOptions;

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'CORS': 'Access-Control-Allow-Origin',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    // this.toasterService.showToaster('error', 'Oops!! An error occurred', errMsg);
    // this.loaderService.displayLoader(false);
    return Observable.throw(errMsg);
}

  getApiUrl(query: String) {
    return 'https://query.yahooapis.com/v1/public/yql?q=' + query + '&format=json';
  }

  getResponse(query: String): Observable<any> {
    return this.http
      .get(this.getApiUrl(query))
      .map(this.extractData);
    // .map(response => <any>response.json().muscleCarData);
  }

  getLocation(woeid: String) {
    const searchtext = 'select * from weather.forecast where woeid in (' + woeid + ') and u = "c"';
    return this.getResponse(searchtext);
    // console.log(this.getApiUrl(this.searchtext));
  }

  getCurrentConditions(woeid: String) {
    const searchtext = 'select item.condition from weather.forecast where woeid in (' + woeid + ') and u = "c"';
    return this.getResponse(searchtext);
    // console.log(this.getApiUrl(this.searchtext));
  }

  getWoeid(city: String) {
    const woeidQuery = 'select woeid from geo.places(1) where text ="' + city + '"';
    return this.getResponse(woeidQuery)
      .map(response => <any>response.json().muscleCarData);
  }

  private getHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}
