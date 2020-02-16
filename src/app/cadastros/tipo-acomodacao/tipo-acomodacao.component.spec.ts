import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoAcomodacaoComponent } from './tipo-acomodacao.component';

describe('TipoAcomodacaoComponent', () => {
  let component: TipoAcomodacaoComponent;
  let fixture: ComponentFixture<TipoAcomodacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoAcomodacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoAcomodacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
