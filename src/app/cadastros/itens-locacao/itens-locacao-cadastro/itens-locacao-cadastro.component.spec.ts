import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensLocacaoCadastroComponent } from './itens-locacao-cadastro.component';

describe('ItensLocacaoCadastroComponent', () => {
  let component: ItensLocacaoCadastroComponent;
  let fixture: ComponentFixture<ItensLocacaoCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItensLocacaoCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItensLocacaoCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
