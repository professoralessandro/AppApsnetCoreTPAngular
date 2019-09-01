import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarLocaisReservaComponent } from './deletar-locais-reserva.component';

describe('DeletarLocaisReservaComponent', () => {
  let component: DeletarLocaisReservaComponent;
  let fixture: ComponentFixture<DeletarLocaisReservaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletarLocaisReservaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarLocaisReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
