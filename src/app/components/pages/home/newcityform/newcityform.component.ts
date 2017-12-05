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
  citiesArray: City[];
  selectedCity: City;
  searchQuery: String;

  constructor(private ywservice: YahooWeatherService, private cs: CitiesService) { }

  ngOnInit() {
    // this.citiesArray = [];
    /*this.ywservice.getCity().subscribe(city => {
      this.citiesArray = city.query.results.place.map( p => {
        const newCity: City = new City;
        newCity.name = p.name;
        newCity.woeid = p.woeid;
        newCity.country_code =  p.country.code;
        newCity.continent = p.timezone.split('/')[0].toLowerCase();
        return newCity;
      });
    });*/
  }

  getCities($event) {
    // this.searchQuery = $event;
    // this.ywservice.getCity('paris');
    /* this.ywservice.getCity('paris').subscribe(city => {
      this.citiesArray = city.query.results.place.map( p => {
        const newCity: City = new City;
        newCity.name = p.name;
        newCity.woeid = p.woeid;
        newCity.country_code =  p.country.code;
        newCity.continent = p.timezone.split('/')[0].toLowerCase();
        return newCity;
      });
    }); */
    // this.citiesArray = this.ywservice.getCity('paris');
    // this.ywservice.setStringsearch('paris');
    // console.log('Newcityform');

    this.citiesArray = this.ywservice.getCity($event);
    // console.log(this.citiesArray);
  }

  saveCity($event) {
    this.selectedCity = $event;
    this.cs.addCity($event);
    this.messageEvent.emit(false);
    console.log(this.selectedCity);
  }
}
