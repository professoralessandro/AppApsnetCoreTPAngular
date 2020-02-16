import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinsDeSemanaCadastroComponent } from './fins-de-semana-cadastro.component';

describe('FinsDeSemanaCadastroComponent', () => {
  let component: FinsDeSemanaCadastroComponent;
  let fixture: ComponentFixture<FinsDeSemanaCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinsDeSemanaCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinsDeSemanaCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
