import { Component } from '@angular/core';
import { Link } from '../../interfaces/link.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public links: Link[];

  constructor() {
    this.links = [
      {
        tag: 'Inicio',
        route: '',
      },
      {
        tag: 'About',
        route: '/about',
      },
    ];
  }
}
