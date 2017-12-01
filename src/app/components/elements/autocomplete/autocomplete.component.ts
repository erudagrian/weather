import { Component, OnInit, ElementRef, Input} from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
    @Input() searchLabel: String;
    query = '';
  data = [
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
  ];
  public filteredList = [];
  public elementRef;

  constructor(myElement: ElementRef) {
    this.elementRef = myElement;
  }

  ngOnInit() {
    console.log(this.searchLabel);
}

  filter() {
    if (this.query !== '') {
        this.filteredList = this.data.filter(function(el){
            return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
        }.bind(this));
    } else {
        this.filteredList = [];
    }
}

  select(item) {
    this.query = item.name;
    this.filteredList = [];
    console.log(item);
  }

  handleClick(event) {
    let clickedComponent = event.target;
    let inside = false;
    do {
        if (clickedComponent === this.elementRef.nativeElement) {
            inside = true;
        }
        clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
        if (!inside) {
            this.filteredList = [];
        }
    }
}
