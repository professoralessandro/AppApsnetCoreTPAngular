import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLocalAcessoComponent } from './editar-local-acesso.component';

describe('EditarLocalAcessoComponent', () => {
  let component: EditarLocalAcessoComponent;
  let fixture: ComponentFixture<EditarLocalAcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarLocalAcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarLocalAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
