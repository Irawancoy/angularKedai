import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProsedurComponent } from './form-prosedur.component';

describe('FormProsedurComponent', () => {
  let component: FormProsedurComponent;
  let fixture: ComponentFixture<FormProsedurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProsedurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProsedurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
