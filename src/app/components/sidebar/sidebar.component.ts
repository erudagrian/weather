import { Component } from '@angular/core';

import { CitiesService } from '../../services/cities.service';

import { Link } from '../../interfaces/link.interface';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  public continentFilter: String;
  public links: Link[];

  constructor(private citiesService: CitiesService) {
    this.links = [
      {
        tag: 'Todos',
        route: '',
      },
      {
        tag: 'África',
        route: 'region/AFR',
      },
      {
        tag: 'Antártica',
        route: 'region/ANT',
      },
      {
        tag: 'Ártica',
        route: 'region/ARC',
      },
      {
        tag: 'Asia',
        route: 'region/ASI',
      },
      {
        tag: 'Centro América',
        route: 'region/CAC',
      },
      {
        tag: 'Europa',
        route: 'region/EUR',
      },
      {
        tag: 'Medio Oriente',
        route: 'region/MEA'
      },
      {
        tag: 'Norte América',
        route: 'region/NAM'
      },
      {
        tag: 'Oceanía',
        route: 'region/OCN',
      },
      {
        tag: 'Sudamérica',
        route: 'region/SAM',
      }
    ];
  }
}
