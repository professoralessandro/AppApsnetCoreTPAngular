import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoCategoriasDeleteComponent } from './grupo-categorias-delete.component';

describe('GrupoCategoriasDeleteComponent', () => {
  let component: GrupoCategoriasDeleteComponent;
  let fixture: ComponentFixture<GrupoCategoriasDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoCategoriasDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoCategoriasDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
