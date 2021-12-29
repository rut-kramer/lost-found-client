import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OKSaveComponent } from './oksave.component';

describe('OKSaveComponent', () => {
  let component: OKSaveComponent;
  let fixture: ComponentFixture<OKSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OKSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OKSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
