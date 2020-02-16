import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoItensCadastroComponent } from './tipo-itens-cadastro.component';

describe('TipoItensCadastroComponent', () => {
  let component: TipoItensCadastroComponent;
  let fixture: ComponentFixture<TipoItensCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoItensCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoItensCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
