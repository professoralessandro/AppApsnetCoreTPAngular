import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmExamesCadastroComponent } from './adm-exames-cadastro.component';

describe('AdmExamesCadastroComponent', () => {
  let component: AdmExamesCadastroComponent;
  let fixture: ComponentFixture<AdmExamesCadastroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmExamesCadastroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmExamesCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
