import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { City } from '../../../models/city.model';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit, OnChanges {

    @Input() public searchLabel: string;
    @Input() public data: City[];
    @Output() public messageEvent = new EventEmitter<City>();
    @Output() public dataSearch = new EventEmitter<String>();

    public query: string;
    public filteredList: City[];
    public selectedItem: City;
    public buttonClass: string;

    constructor() {
        this.filteredList = [];
        this.buttonClass = 'inactive';
    }

    public ngOnInit() {}

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.data.currentValue) {
            this.filteredList = this.data;
        }
      }

    public filter() {
        if (this.selectedItem) {
            this.selectedItem = null;
            this.buttonClass = 'inactive';
        }
        if (this.query !== '') {
            this.dataSearch.emit(this.query);
            if (this.data) {
                this.filteredList = this.data;
                /*this.filteredList = this.data.filter(function(el){
                    return el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
                }.bind(this));*/
                // console.log('Data: ');
                // console.log(this.filteredList);
            }
        } else {
            this.filteredList = [];
        }
    }

    public select(item) {
        this.buttonClass = 'active';
        this.query = item.name;
        this.selectedItem = item;
        this.filteredList = [];
    }

    public sendSelected() {
        if (this.selectedItem) {
            this.messageEvent.emit(this.selectedItem);
            this.selectedItem = null;
        }
    }
}
