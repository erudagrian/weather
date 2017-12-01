import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcityformComponent } from './newcityform.component';

describe('NewcityformComponent', () => {
  let component: NewcityformComponent;
  let fixture: ComponentFixture<NewcityformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewcityformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcityformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
