import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncaminharComponent } from './encaminhar.component';

describe('EncaminharComponent', () => {
  let component: EncaminharComponent;
  let fixture: ComponentFixture<EncaminharComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncaminharComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncaminharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
