import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTicketComponent } from './assign-ticket.component';

describe('AssignTicketComponent', () => {
  let component: AssignTicketComponent;
  let fixture: ComponentFixture<AssignTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignTicketComponent]
    });
    fixture = TestBed.createComponent(AssignTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
