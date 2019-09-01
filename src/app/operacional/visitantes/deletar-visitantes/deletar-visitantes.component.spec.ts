import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarVisitantesComponent } from './deletar-visitantes.component';

describe('DeletarVisitantesComponent', () => {
  let component: DeletarVisitantesComponent;
  let fixture: ComponentFixture<DeletarVisitantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletarVisitantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarVisitantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
