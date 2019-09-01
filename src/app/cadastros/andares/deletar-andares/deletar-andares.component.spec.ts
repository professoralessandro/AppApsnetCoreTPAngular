import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarAndaresComponent } from './deletar-andares.component';

describe('DeletarAndaresComponent', () => {
  let component: DeletarAndaresComponent;
  let fixture: ComponentFixture<DeletarAndaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletarAndaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletarAndaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
