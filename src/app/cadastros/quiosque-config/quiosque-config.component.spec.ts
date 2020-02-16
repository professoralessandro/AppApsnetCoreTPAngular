import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiosqueConfigComponent } from './quiosque-config.component';

describe('QuiosqueConfigComponent', () => {
  let component: QuiosqueConfigComponent;
  let fixture: ComponentFixture<QuiosqueConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuiosqueConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiosqueConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
