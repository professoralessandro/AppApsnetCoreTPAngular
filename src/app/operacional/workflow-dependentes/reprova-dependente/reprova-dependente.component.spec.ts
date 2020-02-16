import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprovaDependenteComponent } from './reprova-dependente.component';

describe('ReprovaDependenteComponent', () => {
  let component: ReprovaDependenteComponent;
  let fixture: ComponentFixture<ReprovaDependenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReprovaDependenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReprovaDependenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
