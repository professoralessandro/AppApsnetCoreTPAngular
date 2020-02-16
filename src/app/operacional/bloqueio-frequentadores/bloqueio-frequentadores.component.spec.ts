import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BloqueioFrequentadoresComponent } from './bloqueio-frequentadores.component';

describe('BloqueioFrequentadoresComponent', () => {
  let component: BloqueioFrequentadoresComponent;
  let fixture: ComponentFixture<BloqueioFrequentadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BloqueioFrequentadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BloqueioFrequentadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
