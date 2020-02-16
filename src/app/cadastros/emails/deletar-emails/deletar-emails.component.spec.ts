import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMailingMailsComponent } from './deletar-emails.component';

describe('DeleteMailingMailsComponent', () => {
  let component: DeleteMailingMailsComponent;
  let fixture: ComponentFixture<DeleteMailingMailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMailingMailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMailingMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
