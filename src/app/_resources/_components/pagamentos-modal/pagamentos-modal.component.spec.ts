import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagamentosModalComponent } from './pagamentos-modal.component';

describe('PagamentosModalComponent', () => {
  let component: PagamentosModalComponent;
  let fixture: ComponentFixture<PagamentosModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagamentosModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagamentosModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
