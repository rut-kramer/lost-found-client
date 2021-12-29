import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeningSearchComponent } from './opening-search.component';

describe('OpeningSearchComponent', () => {
  let component: OpeningSearchComponent;
  let fixture: ComponentFixture<OpeningSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpeningSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpeningSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
