import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiosqueUnidadesCadastroComponent } from './quiosque-unidades-cadastro.component';

describe('QuiosqueUnidadesCadastroComponent', () => {
  let component: QuiosqueUnidadesCadastroComponent;
  let fixture: ComponentFixture<QuiosqueUnidadesCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuiosqueUnidadesCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiosqueUnidadesCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
