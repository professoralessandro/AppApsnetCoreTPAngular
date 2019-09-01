import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensLocacaoDeleteComponent } from './itens-locacao-delete.component';

describe('ItensLocacaoDeleteComponent', () => {
  let component: ItensLocacaoDeleteComponent;
  let fixture: ComponentFixture<ItensLocacaoDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItensLocacaoDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItensLocacaoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
