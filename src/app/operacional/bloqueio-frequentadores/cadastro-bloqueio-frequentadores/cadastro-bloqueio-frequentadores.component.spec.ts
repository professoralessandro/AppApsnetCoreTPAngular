import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroBloqueioFrequentadoresComponent } from './cadastro-bloqueio-frequentadores.component';

describe('CadastroBloqueioFrequentadoresComponent', () => {
  let component: CadastroBloqueioFrequentadoresComponent;
  let fixture: ComponentFixture<CadastroBloqueioFrequentadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroBloqueioFrequentadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroBloqueioFrequentadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
