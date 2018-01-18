import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<Boolean>();
  @Input() header: any;
  @Input() body: any;
  @Input() footer: any;
  constructor() { }

  ngOnInit() {
  }

  modalClose() {
    this.messageEvent.emit(false);
  }

  closeModal($event) {
    this.modalClose();
  }
}
