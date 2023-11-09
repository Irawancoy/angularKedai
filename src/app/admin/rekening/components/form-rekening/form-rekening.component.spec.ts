import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRekeningComponent } from './form-rekening.component';

describe('FormRekeningComponent', () => {
  let component: FormRekeningComponent;
  let fixture: ComponentFixture<FormRekeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRekeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRekeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
