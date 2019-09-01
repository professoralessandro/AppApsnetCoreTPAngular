import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmFeriadosComponent } from './adm-feriados.component';

describe('AdmFeriadosComponent', () => {
  let component: AdmFeriadosComponent;
  let fixture: ComponentFixture<AdmFeriadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmFeriadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmFeriadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
