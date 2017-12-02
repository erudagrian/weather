import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { City } from '../models/city.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Console } from '@angular/core/src/console';


@Injectable()
export class YahooWeatherService {
  city = 'Bangalore';
  woidSearch = 'select * from geo.places where text="sidney AU"';
  citySearch = 'select woeid, name, country.code, timezone.content from geo.places where text="paris" and placetype = "7"';
  currentConditionsSearch = 'select item from weather.forecast where woeid in (select woeid from geo.places where text="paris")';
  headers: Headers;
  options: RequestOptions;
  cities: City[];
  stringSearch: BehaviorSubject<string|null>;

  constructor(private http: Http) {
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'CORS': 'Access-Control-Allow-Origin',
      'Accept': 'q=0.8;application/json;q=0.9'
    });
    this.options = new RequestOptions({ headers: this.headers });

    /*this.stringSearch = new BehaviorSubject(null);
    this.cities = Observable.combineLatest(
      this.stringSearch
    ).switchMap(([stringSearch]) =>
      afs.collection<City>('cities', ref => {
        let query: firebase.firestore.Query = ref;
        if (continent) {
          query = query.where('continent', '==', continent);
        }
        return query;
      }).snapshotChanges().map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as City;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );*/
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

  getPlainResponse(query: String) {
    return this.http
      .get(this.getApiUrl(query))
      .map(this.extractData)
      .subscribe(data => {
        this.cities = data.query.results.place.map( p => {
          const newCity: City = new City;
          newCity.name = p.name;
          newCity.woeid = p.woeid;
          newCity.country_code =  p.country.code;
          newCity.continent = p.timezone.split('/')[0].toLowerCase();
          return newCity;
        });
      });
    // .map(response => <any>response.json().muscleCarData);
  }

  getLocation(woeid: String) {
    const searchtext = 'select * from weather.forecast where woeid in (' + woeid + ') and u = "c"';
    return this.getResponse(searchtext);
    // console.log(this.getApiUrl(this.searchtext));
  }

  getCity(stringSearch: String) {
    const searchtext =
      'select woeid, name, country.code, timezone.content from geo.places where text="' + stringSearch + '" and placetype = "7"';
    /*return this.http.get(this.getApiUrl(searchtext))
      .map(this.extractData)
      .map((jsonResponse: Response) => {
        console.log('Response');
        console.log(jsonResponse);
        return (<any>response.json()).streams.map(stream => {
          console.log(stream);
          return new City ({response

          });
        });
      });*/
      this.getResponse(searchtext).subscribe(city => {
        this.cities = city.query.results.place
          .map((jsonResponse) => {
            return new City ({
              name: jsonResponse.name,
              woeid: jsonResponse.woeid,
              country_code: jsonResponse.country.code,
              continent: jsonResponse.timezone.split('/')[0].toLowerCase()
            });
          });
        });
        return this.cities;
    /* this.getResponse(searchtext).subscribe(city => {
      this.cities = city.query.results.place.map( p => {
        const newCity: City = new City;
        newCity.name = p.name;
        newCity.woeid = p.woeid;
        newCity.country_code =  p.country.code;
        newCity.continent = p.timezone.split('/')[0].toLowerCase();
        return newCity;
      });
    });
    console.log('cities');
    console.log(this.cities); */
    // return this.getPlainResponse(searchtext);
  }

  setStringsearch(stringSearch) {
    this.stringSearch = stringSearch;
  }

  getCurrentConditions(woeid: String) {
    const searchtext = 'select item.condition from weather.forecast where woeid in (' + woeid + ') and u = "c"';
    return this.getResponse(searchtext);
    // console.log(this.getApiUrl(this.searchtext));
  }

  getWoeid(city: String) {
    const woeidQuery = 'select woeid from geo.places(1) where text ="' + city + '"';
    return this.getResponse(woeidQuery)
      // .map(response => <any>response.json().muscleCarData);
  }

  private getHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    return headers;
  }
}
