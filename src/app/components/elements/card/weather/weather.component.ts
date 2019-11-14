import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Power0, Power1, Power2, Power4, TweenMax, EasePack, Elastic } from 'gsap';
import 'snapsvg-cjs';
declare let Snap: any;
// declare let mina: any;    // if you want to use animations of course
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  @Input() currentWeather: any;
  @Input() location: any;
  @ViewChild('container', { static: false }) container;
  @ViewChild('card', { static: false }) card;

  constructor() { }

  ngOnInit() {}
}
