import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CitiesService } from '../../../services/cities.service';
import { City } from '../../../models/city.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cities: City[];
  isvisible: Boolean = false;

  modalHeader = 'Agrega una ciudad';
  modalBody = '';
  modalFooter = '';

  @Output() messageEvent = new EventEmitter<String>();

  constructor(private citiesService: CitiesService) { }

  ngOnInit() {
    this.citiesService.getCities().subscribe(city => {
      this.cities = city;
    });
  }

  deleteItem(event, city: City) {
    this.citiesService.deleteItem(city);
  }

  openModal() {
    this.isvisible = true;
  }

  closeModal($event) {
    this.isvisible = $event;
  }
}
