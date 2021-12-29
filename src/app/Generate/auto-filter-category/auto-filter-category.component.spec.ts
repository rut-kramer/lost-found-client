import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFilterCategoryComponent } from './auto-filter-category.component';

describe('AutoFilterCategoryComponent', () => {
  let component: AutoFilterCategoryComponent;
  let fixture: ComponentFixture<AutoFilterCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoFilterCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoFilterCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
