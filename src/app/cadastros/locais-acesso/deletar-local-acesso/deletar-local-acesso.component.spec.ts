import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarLocalAcessoComponent } from './deletar-local-acesso.component';

describe('DeletarLocalAcessoComponent', () => {
  let component: DeletarLocalAcessoComponent;
  let fixture: ComponentFixture<DeletarLocalAcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletarLocalAcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarLocalAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
