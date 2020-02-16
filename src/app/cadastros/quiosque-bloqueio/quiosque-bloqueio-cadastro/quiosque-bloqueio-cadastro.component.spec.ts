import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiosqueBloqueioCadastroComponent } from './quiosque-bloqueio-cadastro.component';

describe('QuiosqueBloqueioCadastroComponent', () => {
  let component: QuiosqueBloqueioCadastroComponent;
  let fixture: ComponentFixture<QuiosqueBloqueioCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuiosqueBloqueioCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiosqueBloqueioCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
