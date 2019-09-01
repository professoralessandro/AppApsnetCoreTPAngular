import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiosqueConfigDeleteComponent } from './quiosque-config-delete.component';

describe('QuiosqueConfigDeleteComponent', () => {
  let component: QuiosqueConfigDeleteComponent;
  let fixture: ComponentFixture<QuiosqueConfigDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuiosqueConfigDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiosqueConfigDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
