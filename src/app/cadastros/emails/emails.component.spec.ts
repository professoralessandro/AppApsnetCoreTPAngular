import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailingMailsComponent } from './emails.component';

describe('AndaresComponent', () => {
  let component: MailingMailsComponent;
  let fixture: ComponentFixture<MailingMailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailingMailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailingMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
