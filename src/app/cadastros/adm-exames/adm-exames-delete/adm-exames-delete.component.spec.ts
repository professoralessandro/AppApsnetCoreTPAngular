import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmExamesDeleteComponent } from './adm-exames-delete.component';

describe('AdmExamesDeleteComponent', () => {
  let component: AdmExamesDeleteComponent;
  let fixture: ComponentFixture<AdmExamesDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmExamesDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmExamesDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
