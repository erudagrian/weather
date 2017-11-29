import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  open(): void {
    this.element.show();
    $('body').addClass('modal-open');
  }

  close(): void {
    this.element.hide();
    $('body').removeClass('modal-open');
  }

}
