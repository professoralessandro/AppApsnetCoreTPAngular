import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarUnidadeComponent } from './deletar-unidade.component';

describe('DeletarUnidadeComponent', () => {
  let component: DeletarUnidadeComponent;
  let fixture: ComponentFixture<DeletarUnidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletarUnidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarUnidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
