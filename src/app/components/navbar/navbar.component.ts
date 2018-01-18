import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  links = [
    {
      'tag': 'Inicio',
      'route': '',
    },
    /*{
      'tag': 'África',
      'route': '/continent/africa',
    },
    {
      'tag': 'América',
      'route': '/continent/america',
    },
    {
      'tag': 'Asia',
      'route': '/continent/asia',
    },
    {
      'tag': 'Europa',
      'route': '/continent/europe',
    },
    {
      'tag': 'Oceanía',
      'route': '/continent/  australia',
    },*/
    {
      'tag': 'Info',
      'route': '/about',
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
