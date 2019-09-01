import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoCategoriasCadastroComponent } from './grupo-categorias-cadastro.component';

describe('GrupoCategoriasCadastroComponent', () => {
  let component: GrupoCategoriasCadastroComponent;
  let fixture: ComponentFixture<GrupoCategoriasCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoCategoriasCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoCategoriasCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
