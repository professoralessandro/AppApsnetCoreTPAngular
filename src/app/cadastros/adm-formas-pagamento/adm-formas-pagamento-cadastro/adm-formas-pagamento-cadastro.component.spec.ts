import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmFormasPagamentoCadastroComponent } from './adm-formas-pagamento-cadastro.component';

describe('AdmFormasPagamentoCadastroComponent', () => {
  let component: AdmFormasPagamentoCadastroComponent;
  let fixture: ComponentFixture<AdmFormasPagamentoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmFormasPagamentoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmFormasPagamentoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
