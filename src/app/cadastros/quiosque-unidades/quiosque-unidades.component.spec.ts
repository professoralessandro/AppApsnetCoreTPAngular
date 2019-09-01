import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiosqueUnidadesComponent } from './quiosque-unidades.component';

describe('QuiosqueUnidadesComponent', () => {
  let component: QuiosqueUnidadesComponent;
  let fixture: ComponentFixture<QuiosqueUnidadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuiosqueUnidadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiosqueUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
