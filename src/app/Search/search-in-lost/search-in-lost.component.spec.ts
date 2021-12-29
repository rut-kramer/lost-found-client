import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInLostComponent } from './search-in-lost.component';

describe('SearchInLostComponent', () => {
  let component: SearchInLostComponent;
  let fixture: ComponentFixture<SearchInLostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInLostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInLostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
