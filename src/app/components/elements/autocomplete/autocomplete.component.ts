import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

    @Input() searchLabel: String;
    @Input() data: any[];
    @Output() messageEvent = new EventEmitter<Boolean>();
    @Output() dataSearch = new EventEmitter<String>();

    query = '';
    filteredList = [];
    elementRef;
    selectedItem: any = null;
    buttonClass: String = 'inactive';
    constructor() {}

    ngOnInit() {}

    filter() {
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

    select(item) {
        this.buttonClass = 'active';
        this.query = item.name;
        this.selectedItem = item;
        this.filteredList = [];
    }

    sendSelected() {
        if (this.selectedItem) {
            this.messageEvent.emit(this.selectedItem);
            this.selectedItem = null;
        }
    }
}
