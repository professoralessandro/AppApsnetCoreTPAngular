import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarDependenteComponent } from './deletar-dependente.component';

describe('DeletarDependenteComponent', () => {
  let component: DeletarDependenteComponent;
  let fixture: ComponentFixture<DeletarDependenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletarDependenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarDependenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
