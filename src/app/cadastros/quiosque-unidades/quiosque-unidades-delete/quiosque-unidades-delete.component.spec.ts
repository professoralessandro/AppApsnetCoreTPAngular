import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiosqueUnidadesDeleteComponent } from './quiosque-unidades-delete.component';

describe('QuiosqueUnidadesDeleteComponent', () => {
  let component: QuiosqueUnidadesDeleteComponent;
  let fixture: ComponentFixture<QuiosqueUnidadesDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuiosqueUnidadesDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiosqueUnidadesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
