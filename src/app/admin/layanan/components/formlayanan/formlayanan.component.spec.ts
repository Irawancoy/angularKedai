import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormlayananComponent } from './formlayanan.component';

describe('FormlayananComponent', () => {
  let component: FormlayananComponent;
  let fixture: ComponentFixture<FormlayananComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormlayananComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormlayananComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
