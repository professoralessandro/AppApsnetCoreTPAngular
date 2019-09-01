import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmExamesComponent } from './adm-exames.component';

describe('AdmExamesComponent', () => {
  let component: AdmExamesComponent;
  let fixture: ComponentFixture<AdmExamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmExamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmExamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
