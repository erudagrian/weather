import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatingmenuComponent } from './floatingmenu.component';

describe('FloatingmenuComponent', () => {
  let component: FloatingmenuComponent;
  let fixture: ComponentFixture<FloatingmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloatingmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloatingmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
