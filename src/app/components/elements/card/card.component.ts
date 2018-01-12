/**
0 	tornado
1 	tropical storm
2 	hurricane
3 	severe thunderstorms
4 	thunderstorms
5 	mixed rain and snow
6 	mixed rain and sleet
7 	mixed snow and sleet
8 	freezing drizzle
9 	drizzle
10 	freezing rain
11 	showers
12 	showers
13 	snow flurries
14 	light snow showers
15 	blowing snow
16 	snow
17 	hail
18 	sleet
19 	dust
20 	foggy
21 	haze
22 	smoky
23 	blustery
24 	windy
25 	cold
26 	cloudy
27 	mostly cloudy (night)
28 	mostly cloudy (day)
29 	partly cloudy (night)
30 	partly cloudy (day)
31 	clear (night)
32 	sunny
33 	fair (night)
34 	fair (day)
35 	mixed rain and hail
36 	hot
37 	isolated thunderstorms
38 	scattered thunderstorms
39 	scattered thunderstorms
40 	scattered showers
41 	heavy snow
42 	scattered snow showers
43 	heavy snow
44 	partly cloudy
45 	thundershowers
46 	snow showers
47 	isolated thundershowers
3200 	not available
*/
import { Component, Input, OnInit } from '@angular/core';

import { City } from '../../../models/city.model';
import { Condition } from '../../../models/condition.model';
import { YahooWeatherService } from '../../../services/yahoo-weather.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css', './card.weather.scss']
})
export class CardComponent implements OnInit {

  @Input() location: City;
  sufix: string;

  cities: Condition;
  hour: number;
  minute: number;
  weather: number;
  temp: string;
  daytime: string;
  description: string;
  sky = 'blue';

  // Weather switches
  stormy = false;
  tornado = false;
  rainy = false;
  snowy = false;
  dusty = false;
  foggy = false;
  windy = false;
  cloudy = false;
  clear = false;
  semi = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g'];

  // Weather arrays
  stormyArray = ['0', '1', '2', '3', '4', '37', '38', '39', '45', '47'];
  tornadoArray = ['0', '1', '2'];
  rainyArray = ['5', '6', '7', '8', '9', '10', '11', '12', '17', '18', '23', '35', '45', '46', '47'];
  snowyArray = ['5', '6', '7', '8', '13', '14', '15', '16', '41', '42', '43', '46'];
  dustyArray = ['19'];
  foggyArray = ['20', '21', '22'];
  windyArray = ['23', '24', '25', '41', '43'];
  cloudyArray = ['25', '26', '27', '28', '29', '30', '44'];
  clearArray = ['31', '32', '33', '34', '36'];
  semiArray = ['29', '30', '37', '38', '39', '40', '42', '44', '47'];

  currentWeather: { type: 'thunder' };

  constructor(private ywservice: YahooWeatherService) {}

  ngOnInit() {
    this.sufix = 'weather';
    this.ywservice.getCurrentConditions(this.location.woeid).subscribe(city => {
      this.cities = city.query.results.channel.item.condition;
      this.weather = this.cities.code;
      this.temp = this.cities.temp + ' ºC';
      const date = new Date(this.cities.date.substring(0, this.cities.date.length - 4));
      this.hour = date.getHours();
      // this.hour = 18;
      if (this.hour < 16) {
        this.daytime = 'day';
      } else if (this.hour > 20) {
        this.daytime = 'night';
      } else {
        this.daytime = 'afternoon';
      }
      this.setWeather(this.cities.code.toString());
      this.description = this.cities.text;
    });
  }

  setWeather(weatherCode: string) {
    if (this.stormyArray.indexOf(weatherCode) > -1) {
      this.stormy = true;
      this.sky = 'grey';
    } else if (this.tornadoArray.indexOf(weatherCode) > -1) {
      this.tornado = true;
      this.sky = 'grey';
    } else if (this.rainyArray.indexOf(weatherCode) > -1) {
      this.rainy = true;
      this.sky = 'grey';
    } else if (this.snowyArray.indexOf(weatherCode) > -1) {
      this.snowy = true;
      this.sky = 'grey';
    } else if (this.dustyArray.indexOf(weatherCode) > -1) {
      this.dusty = true;
    } else if (this.foggyArray.indexOf(weatherCode) > -1) {
      this.foggy = true;
      this.sky = 'grey';
    } else if (this.windyArray.indexOf(weatherCode) > -1) {
      this.windy = true;
    } else if (this.cloudyArray.indexOf(weatherCode) > -1) {
      this.cloudy = true;
    } else if (this.clearArray.indexOf(weatherCode) > -1) {
      this.clear = true;
    } else if (this.semiArray.indexOf(weatherCode) > -1) {
      this.semi = ['', 'a', 'b', 'c'];
    }
    this.stormy = true;
    this.cloudy = false;
    this.sky = 'grey';
    this.semi = ['', 'a', 'b', 'c'];
  }
}
