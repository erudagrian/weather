import { Component, OnInit} from '@angular/core';

import { CitiesService } from '../../services/cities.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  links = [
    {
      'tag': 'Todos',
      'route': null,
    },
    {
      'tag': 'África',
      'route': 'africa',
    },
    {
      'tag': 'América',
      'route': 'america',
    },
    {
      'tag': 'Asia',
      'route': 'asia',
    },
    {
      'tag': 'Europa',
      'route': 'europe',
    },
    {
      'tag': 'Oceanía',
      'route': 'australia',
    }
  ];

  continentFilter: String;

  constructor(private citiesService: CitiesService) { }

  ngOnInit() {  }

  filterContinent(continent) {
    this.continentFilter = continent;
    this.citiesService.filterByContinent(continent);
  }

}
