import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaisAcessoComponent } from './locais-acesso.component';

describe('LocaisAcessoComponent', () => {
  let component: LocaisAcessoComponent;
  let fixture: ComponentFixture<LocaisAcessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocaisAcessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaisAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
