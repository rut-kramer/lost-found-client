import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhichOwnerReturnedComponent } from './which-owner-returned.component';

describe('WhichOwnerReturnedComponent', () => {
  let component: WhichOwnerReturnedComponent;
  let fixture: ComponentFixture<WhichOwnerReturnedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhichOwnerReturnedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhichOwnerReturnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
