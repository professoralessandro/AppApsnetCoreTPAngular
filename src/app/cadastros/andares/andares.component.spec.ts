import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AndaresComponent } from './andares.component';

describe('AndaresComponent', () => {
  let component: AndaresComponent;
  let fixture: ComponentFixture<AndaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
