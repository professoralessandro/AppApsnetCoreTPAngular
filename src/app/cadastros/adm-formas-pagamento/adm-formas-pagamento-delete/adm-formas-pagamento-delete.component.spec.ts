import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmFormasPagamentoDeleteComponent } from './adm-formas-pagamento-delete.component';

describe('AdmFormasPagamentoDeleteComponent', () => {
  let component: AdmFormasPagamentoDeleteComponent;
  let fixture: ComponentFixture<AdmFormasPagamentoDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmFormasPagamentoDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmFormasPagamentoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
