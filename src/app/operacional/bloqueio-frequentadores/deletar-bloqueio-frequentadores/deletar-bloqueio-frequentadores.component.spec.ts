import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarBloqueioFrequentadoresComponent } from './deletar-bloqueio-frequentadores.component';

describe('DeletarBloqueioFrequentadoresComponent', () => {
  let component: DeletarBloqueioFrequentadoresComponent;
  let fixture: ComponentFixture<DeletarBloqueioFrequentadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletarBloqueioFrequentadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarBloqueioFrequentadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
