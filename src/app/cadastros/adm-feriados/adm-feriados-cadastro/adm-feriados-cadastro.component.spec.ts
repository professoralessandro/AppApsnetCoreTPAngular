import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmFeriadosCadastroComponent } from './adm-feriados-cadastro.component';

describe('AdmFeriadosCadastroComponent', () => {
  let component: AdmFeriadosCadastroComponent;
  let fixture: ComponentFixture<AdmFeriadosCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmFeriadosCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmFeriadosCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
