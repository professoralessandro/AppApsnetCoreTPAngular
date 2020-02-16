import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiosqueComponent } from './quiosque.component';

describe('QuiosqueComponent', () => {
  let component: QuiosqueComponent;
  let fixture: ComponentFixture<QuiosqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuiosqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiosqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
