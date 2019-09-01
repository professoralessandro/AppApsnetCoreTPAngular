import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiosqueBloqueioDeletarComponent } from './quiosque-bloqueio-deletar.component';

describe('QuiosqueBloqueioDeletarComponent', () => {
  let component: QuiosqueBloqueioDeletarComponent;
  let fixture: ComponentFixture<QuiosqueBloqueioDeletarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuiosqueBloqueioDeletarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiosqueBloqueioDeletarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
