import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoItensDeleteComponent } from './tipo-itens-delete.component';

describe('TipoItensDeleteComponent', () => {
  let component: TipoItensDeleteComponent;
  let fixture: ComponentFixture<TipoItensDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoItensDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoItensDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
