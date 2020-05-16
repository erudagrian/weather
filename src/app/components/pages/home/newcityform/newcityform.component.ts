import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { Observable } from 'rxjs';

import { WeatherService } from '../../../../services/weather.service';
import { CitiesService } from '../../../../services/cities.service';
import { City } from '../../../../interfaces/city.interface';

@Component({
  selector: 'app-newcityform',
  templateUrl: './newcityform.component.html',
  styleUrls: ['./newcityform.component.css']
})
export class NewcityformComponent {

  @Output() messageEvent = new EventEmitter<Boolean>();
  public searchfieldLabel: string;
  public citiesArray$: Observable<City[]>;
  public selectedCity: City;

  constructor(
    private _cs: CitiesService,
    private _ws: WeatherService
  ) {
    this.searchfieldLabel = 'Ciudades';
  }

  getCities(query: string): void {
    if (typeof query === 'string' && query.length > 2) {
      this.citiesArray$ = this._ws.getCity(query);
      console.log('Cities Array', this.citiesArray$);
    }
  }

  saveCity(city: City): void {
    this.selectedCity = city;
    this._cs.addCity(city);
    this.messageEvent.emit(false);
  }
}
