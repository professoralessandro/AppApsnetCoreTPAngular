import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiosqueDetalheComponent } from './quiosque-detalhe.component';

describe('QuiosqueDetalheComponent', () => {
  let component: QuiosqueDetalheComponent;
  let fixture: ComponentFixture<QuiosqueDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuiosqueDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiosqueDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
