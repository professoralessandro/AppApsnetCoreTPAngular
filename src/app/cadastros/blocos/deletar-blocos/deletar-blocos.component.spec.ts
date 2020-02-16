import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarBlocosComponent } from './deletar-blocos.component';

describe('DeletarBlocosComponent', () => {
  let component: DeletarBlocosComponent;
  let fixture: ComponentFixture<DeletarBlocosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletarBlocosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarBlocosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
