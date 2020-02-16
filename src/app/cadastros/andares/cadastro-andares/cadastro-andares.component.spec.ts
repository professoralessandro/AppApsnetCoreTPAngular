import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAndaresComponent } from './cadastro-andares.component';

describe('CadastroAndaresComponent', () => {
  let component: CadastroAndaresComponent;
  let fixture: ComponentFixture<CadastroAndaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroAndaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAndaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
