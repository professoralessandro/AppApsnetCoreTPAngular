import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmFormasPagamentoComponent } from './adm-formas-pagamento.component';

describe('AdmFormasPagamentoComponent', () => {
  let component: AdmFormasPagamentoComponent;
  let fixture: ComponentFixture<AdmFormasPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmFormasPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmFormasPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
