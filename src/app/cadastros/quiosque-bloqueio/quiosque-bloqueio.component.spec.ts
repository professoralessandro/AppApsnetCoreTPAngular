import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiosqueBloqueioComponent } from './quiosque-bloqueio.component';

describe('QuiosqueBloqueioComponent', () => {
  let component: QuiosqueBloqueioComponent;
  let fixture: ComponentFixture<QuiosqueBloqueioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuiosqueBloqueioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuiosqueBloqueioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
