import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInFoundComponent } from './search-in-found.component';

describe('SearchInFoundComponent', () => {
  let component: SearchInFoundComponent;
  let fixture: ComponentFixture<SearchInFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchInFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchInFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
