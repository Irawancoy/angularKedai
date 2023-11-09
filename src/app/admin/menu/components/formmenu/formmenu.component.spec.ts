import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormmenuComponent } from './formmenu.component';

describe('FormmenuComponent', () => {
  let component: FormmenuComponent;
  let fixture: ComponentFixture<FormmenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormmenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
