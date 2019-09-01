import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroVisitantesComponent } from './cadastro-visitantes.component';

describe('CadastroVisitantesComponent', () => {
  let component: CadastroVisitantesComponent;
  let fixture: ComponentFixture<CadastroVisitantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroVisitantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroVisitantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
