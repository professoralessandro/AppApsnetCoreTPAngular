import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarDestaquesComponent } from './deletar-destaques.component';

describe('DeletarDestaquesComponent', () => {
  let component: DeletarDestaquesComponent;
  let fixture: ComponentFixture<DeletarDestaquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletarDestaquesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarDestaquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
