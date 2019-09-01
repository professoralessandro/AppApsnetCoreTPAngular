import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscaCadastroBloqueioFrequentadoresComponent } from './busca-cadastro-bloqueio-frequentadores.component';

describe('BuscaCadastroBloqueioFrequentadoresComponent', () => {
  let component: BuscaCadastroBloqueioFrequentadoresComponent;
  let fixture: ComponentFixture<BuscaCadastroBloqueioFrequentadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscaCadastroBloqueioFrequentadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscaCadastroBloqueioFrequentadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
