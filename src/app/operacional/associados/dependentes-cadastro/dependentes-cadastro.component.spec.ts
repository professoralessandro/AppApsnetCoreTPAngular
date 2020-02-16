import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependentesCadastroComponent } from './dependentes-cadastro.component';

describe('DependentesCadastroComponent', () => {
  let component: DependentesCadastroComponent;
  let fixture: ComponentFixture<DependentesCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependentesCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentesCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
