import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarTipoAcomodacaoComponent } from './deletar-tipo-acomodacao.component';

describe('DeletarTipoAcomodacaoComponent', () => {
  let component: DeletarTipoAcomodacaoComponent;
  let fixture: ComponentFixture<DeletarTipoAcomodacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletarTipoAcomodacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarTipoAcomodacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
