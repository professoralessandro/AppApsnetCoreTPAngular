import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDestaquesComponent } from './cadastro-destaques.component';

describe('CadastroDestaquesComponent', () => {
  let component: CadastroDestaquesComponent;
  let fixture: ComponentFixture<CadastroDestaquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroDestaquesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroDestaquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
