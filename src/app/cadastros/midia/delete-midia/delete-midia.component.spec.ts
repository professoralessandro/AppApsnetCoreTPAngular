import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteMidiaComponent } from './delete-midia.component';

describe('DeleteMidiaComponent', () => {
  let component: DeleteMidiaComponent;
  let fixture: ComponentFixture<DeleteMidiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteMidiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteMidiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
