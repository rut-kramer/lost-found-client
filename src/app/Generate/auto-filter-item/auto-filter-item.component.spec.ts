import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFilterItemComponent } from './auto-filter-item.component';

describe('AutoFilterItemComponent', () => {
  let component: AutoFilterItemComponent;
  let fixture: ComponentFixture<AutoFilterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoFilterItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoFilterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
