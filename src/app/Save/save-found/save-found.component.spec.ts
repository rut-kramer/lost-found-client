import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveFoundComponent } from './save-found.component';

describe('SaveFoundComponent', () => {
  let component: SaveFoundComponent;
  let fixture: ComponentFixture<SaveFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
