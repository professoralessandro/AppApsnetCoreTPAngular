import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroemailsComponent } from './cadastro-emails.component';

describe('CadastroemailsComponent', () => {
  let component: CadastroemailsComponent;
  let fixture: ComponentFixture<CadastroemailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroemailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroemailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
