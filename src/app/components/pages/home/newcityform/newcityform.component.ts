import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { YahooWeatherService } from '../../../../services/yahoo-weather.service';
import { CitiesService } from '../../../../services/cities.service';
import { City } from '../../../../models/city.model';

@Component({
  selector: 'app-newcityform',
  templateUrl: './newcityform.component.html',
  styleUrls: ['./newcityform.component.css']
})
export class NewcityformComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<Boolean>();
  searchfieldLabel = 'Ciudades';
  citiesArray: Observable<City[]>;
  selectedCity: City;
  searchQuery: String;

  constructor(private ywservice: YahooWeatherService, private cs: CitiesService) { }

  ngOnInit() {
  }

  getCities($event) {
    this.citiesArray = this.ywservice.getCity($event);
  }

  saveCity($event) {
    this.selectedCity = $event;
    this.cs.addCity($event);
    this.messageEvent.emit(false);
  }
}
