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
  styleUrls: ['./card.component.css', './weather.scss']
})
export class CardComponent implements OnInit {

  @Input() location: City;
  sufix: String;

  cities: Condition;
  hour: Number;
  minute: Number;
  weather: Number;
  temp: String;
  daytime: String;
  description: String;


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
      this.description = this.cities.text;
    });
  }

}
