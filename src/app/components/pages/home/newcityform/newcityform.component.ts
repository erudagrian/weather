import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { YahooWeatherService } from '../../../../services/yahoo-weather.service';
import { City } from '../../../../models/city.model';

@Component({
  selector: 'app-newcityform',
  templateUrl: './newcityform.component.html',
  styleUrls: ['./newcityform.component.css']
})
export class NewcityformComponent implements OnInit {

  searchfieldLabel = 'Ciudades';
  citiesArray: City[];
  selectedCity: City;
  searchQuery: String;

  constructor(private ywservice: YahooWeatherService) { }

  ngOnInit() {
    this.citiesArray = [];
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
    /*this.citiesArray = [
      {id: 'ab', name: 'Albania'},
      {id: 'bg', name: 'Belgium'},
      {id: 'cr', name: 'Croatia'},
      {id: 'dn', name: 'Denmark'},
      {id: 'fr', name: 'France'},
      {id: 'gm', name: 'Germany'},
      {id: 'hg', name: 'Hungary'},
      {id: 'ic', name: 'Iceland'},
      {id: 'kv', name: 'Kosovo'},
      {id: 'lv', name: 'Latvia'},
      {id: 'mc', name: 'Monaco'},
      {id: 'nw', name: 'Norway'},
      {id: 'pl', name: 'Poland'},
      {id: 'rm', name: 'Romania'},
      {id: 'sp', name: 'Spain'},
      {id: 'tk', name: 'Turkey'},
      {id: 'un', name: 'Ukraine'},
      {id: 'vc', name: 'Vatican City'},
    ];*/
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
    console.log('Newcityform');
    this.citiesArray = this.ywservice.getCity('paris');
    console.log(this.citiesArray);
  }

  saveCity($event) {
    this.selectedCity = $event as City;
  }
}
