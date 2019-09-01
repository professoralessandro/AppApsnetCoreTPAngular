import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiosqueConfigCadastroComponent } from './quiosque-config-cadastro.component';

describe('QuiosqueConfigCadastroComponent', () => {
  let component: QuiosqueConfigCadastroComponent;
  let fixture: ComponentFixture<QuiosqueConfigCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuiosqueConfigCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiosqueConfigCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
