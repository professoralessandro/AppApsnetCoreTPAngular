import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmFeriadosDeleteComponent } from './adm-feriados-delete.component';

describe('AdmFeriadosDeleteComponent', () => {
  let component: AdmFeriadosDeleteComponent;
  let fixture: ComponentFixture<AdmFeriadosDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmFeriadosDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmFeriadosDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
