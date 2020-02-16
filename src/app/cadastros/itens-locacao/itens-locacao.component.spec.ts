import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensLocacaoComponent } from './itens-locacao.component';

describe('ItensLocacaoComponent', () => {
  let component: ItensLocacaoComponent;
  let fixture: ComponentFixture<ItensLocacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItensLocacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItensLocacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
