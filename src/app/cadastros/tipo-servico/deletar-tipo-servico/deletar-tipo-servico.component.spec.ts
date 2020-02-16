import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarTipoServicoComponent } from './deletar-tipo-servico.component';

describe('DeletarTipoServicoComponent', () => {
  let component: DeletarTipoServicoComponent;
  let fixture: ComponentFixture<DeletarTipoServicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletarTipoServicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarTipoServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
