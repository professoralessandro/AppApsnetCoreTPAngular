import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposCategoriasComponent } from './grupos-categorias.component';

describe('GruposCategoriasComponent', () => {
  let component: GruposCategoriasComponent;
  let fixture: ComponentFixture<GruposCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
