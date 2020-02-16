import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroBlocosComponent } from './cadastro-blocos.component';

describe('CadastroBlocosComponent', () => {
  let component: CadastroBlocosComponent;
  let fixture: ComponentFixture<CadastroBlocosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroBlocosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroBlocosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
