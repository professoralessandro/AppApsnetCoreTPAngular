import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowDependentesComponent } from './workflow-dependentes.component';

describe('WorkflowDependentesComponent', () => {
  let component: WorkflowDependentesComponent;
  let fixture: ComponentFixture<WorkflowDependentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowDependentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowDependentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
