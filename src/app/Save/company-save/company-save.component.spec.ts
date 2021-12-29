import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySaveComponent } from './company-save.component';

describe('CompanySaveComponent', () => {
  let component: CompanySaveComponent;
  let fixture: ComponentFixture<CompanySaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
