import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveLostComponent } from './save-lost.component';

describe('SaveLostComponent', () => {
  let component: SaveLostComponent;
  let fixture: ComponentFixture<SaveLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
